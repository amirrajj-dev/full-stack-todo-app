'use client'
import React, { useEffect } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FaCheckDouble } from "react-icons/fa6";
import Link from "next/link";
import { SignInSchemaType, schema } from '@/validations/signin.validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";

const SignInForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors , isSubmitting }} = useForm<SignInSchemaType>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (errors.password) {
      toast({
        title: "Password Error",
        description: errors.password.message,
        variant: "destructive",
        duration: 4000,
      });
      
      if (errors.email) {
        toast({
          title: "Email Error",
          description: errors.email.message,
          variant: "destructive",
          duration: 4000,
        });
      }
    }
  }, [errors, toast]);

  const handleFormSubmit = async (data : SignInSchemaType) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 roboto px-2">
      <Card className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 shadow-md rounded-lg">
        <h1 className="flex items-center justify-center gap-2 text-xl mb-10 text-gray-900 dark:text-gray-100">
          <FaCheckDouble className="bg-emerald-600 rounded-md text-white size-7 p-1.5" />
          <span>Todo App</span>
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
          Sign In
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex items-center border-b border-gray-300 dark:border-gray-600 py-2">
            <FiMail className="text-gray-400 mr-3" size={20} />
            <Input
              {...register('email')}
              type="email"
              name="email"
              placeholder="Email"
              className="w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 dark:border-gray-600 py-2">
            <FiLock className="text-gray-400 mr-3" size={20} />
            <Input
              {...register('password')}
              type="password"
              name="password"
              placeholder="Password"
              className="w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-transparent focus:outline-none"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700"
          >
            {isSubmitting? 'Signinig In ...' : 'Sign In'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?
            <Link href="/signup" className="text-emerald-600 hover:underline text-sm ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignInForm;