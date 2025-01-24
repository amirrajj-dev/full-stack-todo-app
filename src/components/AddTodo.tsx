import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { Button } from './ui/button';
import CreateTodoDialog from './CreateTodoDialog';

const AddTodo = () => {
  // Current date in the desired format
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className='flex items-center justify-between mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md'>
      <div className="flex flex-col gap-1 dark:text-gray-200">
        <h2 className='text-xl font-bold'>Today's Tasks</h2>
        <span className='text-sm text-gray-600 dark:text-gray-400'>{currentDate}</span>
      </div>
      <CreateTodoDialog/>
    </div>
  )
}

export default AddTodo;