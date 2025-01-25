import React from "react";

interface TodoButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const TodoButton: React.FC<TodoButtonProps> = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`text-white border border-gray-700 transition-transform duration-300 transform hover:scale-110 ${className}`}
  >
    {children}
  </button>
);

export default TodoButton;