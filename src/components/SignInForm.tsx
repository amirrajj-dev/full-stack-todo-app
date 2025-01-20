import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { FaCheckDouble } from 'react-icons/fa6';

const SignInForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 roboto">
      <Card className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 shadow-md rounded-lg">
        <h1 className="flex items-center justify-center gap-2 text-xl mb-10 text-gray-900 dark:text-gray-100">
          <FaCheckDouble className="bg-emerald-600 rounded-md text-white size-7 p-1.5" />
          <span>Todo App</span>
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">Sign In</h2>
        <form className="space-y-4">
          <div className="flex items-center border-b border-gray-300 dark:border-gray-600 py-2">
            <FiMail className="text-gray-400 mr-3" size={20} />
            <Input
              type="email"
              placeholder="Email"
              className="w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 dark:border-gray-600 py-2">
            <FiLock className="text-gray-400 mr-3" size={20} />
            <Input
              type="password"
              placeholder="Password"
              className="w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-transparent focus:outline-none"
            />
          </div>
          <Button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignInForm;