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
    className="input bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-auto"
  />
);

export default TodoInput;