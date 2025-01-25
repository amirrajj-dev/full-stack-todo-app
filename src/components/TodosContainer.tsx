"use client";
import React, { useEffect, useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import Todo from "./Todo";
import { getTodosAction } from "@/actions/todo.action";

interface TodoType {
  id: number;
  title: string;
  priority: string;
  status: string;
}

const TodosContainer: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      const result = await getTodosAction();
      if (result.success) {
        setTodos(result.todos);
      }
      setLoading(false);
    };
    getTodos();
  }, []);

  const handleEditTodo = (id: number, updatedTodo: { title: string; priority: string; status: string }) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handlePriorityChange = (id: number, priority: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo)));
  };

  const handleStatusChange = (id: number, status: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status } : todo)));
  };

  return (
    <div className="todo-list mt-4 mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex items-center justify-center mt-10 text-center">
          <CgSpinner className="text-6xl text-purple-500 animate-spin" />
        </div>
      ) : todos.length > 0 ? (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            onPriorityChange={handlePriorityChange}
            onStatusChange={handleStatusChange}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-10 text-center text-gray-500">
          <FiClipboard className="text-6xl mb-4 animate-bounce" />
          <p className="text-2xl font-semibold">No todos yet!</p>
          <p className="text-lg mt-2">Enjoy a moment of relaxation or start adding new tasks to get organized.</p>
        </div>
      )}
    </div>
  );
};

export default TodosContainer;