"use server";

import { SignUpType } from "@/validations/signup.validation";
import prisma from "../../utils/prisma";
import { revalidatePath } from "next/cache";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

export const signUpAction = async (formData: SignUpType) => {
  if (!formData.email || !formData.password || !formData.name) {
    return {
      success: false,
      message: "Please fill all the fields",
    };
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

    // Revalidate path
    revalidatePath("/");

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