'use client'
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/store/auth.store";
import { FaExclamationCircle } from "react-icons/fa";

const StatusCards = () => {
  const { user, getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, [getUser]);
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <FaExclamationCircle className="text-red-600 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No User Logged In</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Please log in to view your todos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Completed Todos Card */}
      <Card className="bg-white dark:bg-gray-900 shadow-md rounded-md">
        <CardHeader>
          <CardTitle>Completed Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>View all your completed tasks here.</p>
          {/* Add logic to list completed todos */}
        </CardContent>
      </Card>

      {/* Pending Todos Card */}
      <Card className="bg-white dark:bg-gray-900 shadow-md rounded-md">
        <CardHeader>
          <CardTitle>Pending Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Check out your pending tasks.</p>
          {/* Add logic to list pending todos */}
        </CardContent>
      </Card>

      {/* In-Progress Todos Card */}
      <Card className="bg-white dark:bg-gray-900 shadow-md rounded-md">
        <CardHeader>
          <CardTitle>In-Progress Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>See what you're currently working on.</p>
          {/* Add logic to list in-progress todos */}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCards;
