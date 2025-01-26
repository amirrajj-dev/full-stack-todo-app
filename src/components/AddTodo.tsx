import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "./ui/button";
import CreateTodoDialog from "./CreateTodoDialog";
import { getCurrentUserAction } from "@/actions/auth.action";
import Link from "next/link";

const AddTodo = async () => {
  // Current date in the desired format
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentUser = (await getCurrentUserAction())?.user;

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 p-4 bg-gray-100 dark:bg-gray-900 rounded-md shadow-md">
        <h2 className="text-xl font-bold dark:text-gray-200">
          Welcome to the Todo App
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Please log in to start managing your tasks.
        </p>
        <Link href={"/signin"}>
          <Button className="mt-4">Log In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-md shadow-md">
      <div className="flex flex-col gap-1 dark:text-gray-200">
        <h2 className="text-xl font-bold">Today's Tasks</h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {currentDate}
        </span>
      </div>
      <CreateTodoDialog />
    </div>
  );
};

export default AddTodo;
