import React from "react";

interface TodoInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className="input dark:bg-gray-800 dark:text-white p-2 rounded-md focus:outline-none ring-2 ring-emerald-500 w-full md:w-auto"
  />
);

export default TodoInput;