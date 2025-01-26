import React from "react";
import { Button } from "./ui/button";

interface TodoButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const TodoButton: React.FC<TodoButtonProps> = ({ onClick, children, className }) => (
  <Button
    onClick={onClick}
    className={`text-white border border-gray-700 transition-transform duration-300 transform hover:scale-110 ${className}`}
  >
    {children}
  </Button>
);

export default TodoButton;