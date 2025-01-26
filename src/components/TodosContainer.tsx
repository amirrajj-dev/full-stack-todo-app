"use client";
import React, { useEffect, useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import Todo from "./Todo";
import { getTodosAction, updateTodoAction } from "@/actions/todo.action";
import { Priority, Prisma, Status } from "@prisma/client";
import { toast } from "@/hooks/use-toast";

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
      const todos = (await getTodosAction()).todos;
        setTodos(todos);
      
      setLoading(false);
    };
    getTodos();
  }, []);

  const handleEditTodo = async (id: number, updatedTodo: Partial<Prisma.TodoCreateInput>) => {
    const res = await updateTodoAction(id , updatedTodo);
    if (res.success) {
      toast({
        title:res.message,
        className: "bg-emerald-600",
      })
      setTodos(todos.map(todo=>todo.id === id ? {...todo , ...updatedTodo} : todo))
    } else {
      toast({
        title: res.message,
        variant: "destructive",
      })
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handlePriorityChange = async (id: number, priority: Priority) => {
    const res = await updateTodoAction(id , {priority});
    if (res.success) {
      toast({
        title:res.message,
        className: "bg-emerald-600",
      })
    }else{
      toast({
        title: res.message,
        variant: "destructive",
      })
    }
  };

  const handleStatusChange = async (id: number, status: Status) => {
    const res = await updateTodoAction(id , {status});
    if (res.success) {
      toast({
        title:res.message,
        className: "bg-emerald-600",
      })
    }else{
      toast({
        title: res.message,
        variant: "destructive",
      })
    }
  };

  return (
    <div className="todo-list mt-4 mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex items-center justify-center mt-10 text-center">
          <CgSpinner className="text-6xl text-emerald-500 animate-spin" />
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