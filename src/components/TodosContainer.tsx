"use client";
import React, { useEffect } from 'react';
import { FiClipboard } from 'react-icons/fi';
import { CgSpinner } from 'react-icons/cg';
import Todo from './Todo';
import { Priority, Status, Prisma } from '@prisma/client';
import useTodoStore from '@/store/todo.store';
import {ScrollArea} from '@/components/ui/scroll-area'

const TodosContainer: React.FC = () => {
  const {
    todos,
    loading,
    fetchTodos,
    updateTodo,
    deleteTodo,
    setPriority,
    setStatus,
  } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleEditTodo = async (id: number, updatedTodo: Partial<Prisma.TodoCreateInput>) => {
    await updateTodo(id, updatedTodo);
  };

  const handleDeleteTodo = async (id: number) => {
    const isSure = confirm('Are you sure you want to delete this Todo');
    if (isSure) {
      await deleteTodo(id);
    }
  };

  const handlePriorityChange = async (id: number, priority: Priority) => {
    await setPriority(id, priority);
  };

  const handleStatusChange = async (id: number, status: Status) => {
    await setStatus(id, status);
  };

  return (
    <div className="todo-list mt-4 mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex items-center justify-center mt-10 text-center">
          <CgSpinner className="text-6xl text-emerald-500 animate-spin" />
        </div>
      ) : todos?.length > 0 ? (
        <ScrollArea className='h-80'>
          {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            onPriorityChange={handlePriorityChange}
            onStatusChange={handleStatusChange}
          />
        ))}
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10 text-center text-gray-500">
          <FiClipboard className="text-6xl mb-4 animate-bounce text-emerald-600" />
          <p className="text-2xl font-semibold">No todos yet!</p>
          <p className="text-lg mt-2">
            Enjoy a moment of relaxation or start adding new tasks to get organized.
          </p>
        </div>
      )}
    </div>
  );
};

export default TodosContainer;