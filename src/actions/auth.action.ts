"use server";

import { SignUpType } from "@/validations/signup.validation";
import prisma from "../../utils/prisma";
import { revalidatePath } from "next/cache";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import { SignInSchemaType } from "@/validations/signin.validation";

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
    cookiesStore.set('todo-app-token', token , {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
      path: '/',
      sameSite: 'strict',
      secure: true,
    });

    // Revalidate path
    revalidatePath("/");

    return {
      success: true,
      user,
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
  // Revalidate path
  revalidatePath("/");
  return {
    success: true,
    message: "You have been logged out successfully",
  }
}

export const getCurrentUserAction = async ()=>{
  try {
    // Check if JWT token is available in cookies
    const cookiesStore = await cookies();
    const token = cookiesStore.get('todo-app-token')?.value
    if (!token) {
      return {
        success: false,
        message: "You are not logged in",
      };
    }
    
    // Verify JWT token

    if (typeof process.env.SECRET_KEY !== 'string') return
    const decodedToken = await jwt.verify(token , process.env.SECRET_KEY)
    const email = decodedToken!.email ;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        success: false,
        message: "Failed to retrieve user data",
      }
    }
    user.password = ''
    return {
      success: true,
      user,
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while retrieving user data",
      error
    }
  }
}

export const signInAction = async (formdata : SignInSchemaType)=>{
  try {
    const {email , password} = formdata
    if (!email ||!password) {
      return {
        success: false,
        message: "Please fill all the fields",
      }
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        success: false,
        message: "User not found",
      }
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Incorrect password",
      }
    }
    if (typeof process.env.SECRET_KEY !== 'string') return
    const token = await jwt.sign({email : user.email} , process.env.SECRET_KEY , {
      expiresIn: '7d',
    })
    const cookiesStore = await cookies();
    await cookiesStore.set('todo-app-token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 hour
      path: '/',
      sameSite:'strict',
      secure: true,
    })
    return {
      success: true,
      message: "You have been logged in successfully",
      user,
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during sign in",
      error
    }
  }
}