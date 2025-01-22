"use server";

import { SignUpType } from "@/validations/signup.validation";
import prisma from "../../utils/prisma";
import { revalidatePath } from "next/cache";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import { useAuth } from "@/store/auth.store";

export const signUpAction = async (formData: SignUpType) => {
  if (!formData.email || !formData.password || !formData.name) {
    return {
      success: false,
      message: "Please fill all the fields",
    };
  }
  
  const isUserExist = await prisma.user.findUnique({
    where: { email: formData.email , name : formData.name },
  })
  if (isUserExist) {
    return {
      success: false,
      message: "user already exists",
    }
  }
  
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Ensure JWT secret is available
    if (typeof process.env.SECRET_KEY !== "string") {
      throw new Error("SECRET_KEY is not defined");
    }

    // Generate JWT token
    const token = await jwt.sign({ email: formData.email }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Failed to sign you up, try again later",
      };
    }

    // Set JWT token in cookies
    const cookiesStore = await cookies();
    cookiesStore.set('todo-app-token', token);

    const setUser = useAuth.getState().setUser

    // Revalidate path
    revalidatePath("/");

    setUser({
      name: user.name,
      email: user.email,
      todos : [],
      isLoggedIn: true,
    })

    return {
      success: true,
      message: "You have been signed up successfully",
    };

  } catch (error) {
    console.error("Error during sign up:", error);
    return {
      success: false,
      message: "An error occurred during sign up. Please try again later.",
    };
  }
};

export const logOutAction = async ()=>{
  // Clear JWT token from cookies
  const cookiesStore = await cookies();
  cookiesStore.set('todo-app-token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })
  const setUser = useAuth.getState().setUser
  setUser(null)
  // Revalidate path
  revalidatePath("/");
  return {
    success: true,
    message: "You have been logged out successfully",
  }
}