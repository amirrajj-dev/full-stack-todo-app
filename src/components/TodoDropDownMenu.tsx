import React from "react";
import { FiEdit, FiCopy, FiTrash } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TodoDropdownMenuProps {
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

const TodoDropdownMenu: React.FC<TodoDropdownMenuProps> = ({ onEdit, onCopy, onDelete }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="text-white bg-purple-600 p-2 rounded-md hover:bg-purple-700 border border-gray-700 transition-transform duration-300 transform hover:scale-110">
      <FiEdit />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="dark:bg-gray-800 shadow-lg">
      <DropdownMenuLabel className="dark:text-gray-300 font-semibold">Actions</DropdownMenuLabel>
      <DropdownMenuSeparator className="border-gray-700 my-1" />
      <DropdownMenuItem onSelect={onEdit} className="flex items-center dark:text-gray-300 hover:bg-gray-700 cursor-pointer p-2 rounded-md">
        <FiEdit className="mr-2" /> Edit
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={onCopy} className="flex items-center dark:text-gray-300 hover:bg-gray-700 cursor-pointer p-2 rounded-md">
        <FiCopy className="mr-2" /> Copy
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={onDelete} className="flex items-center dark:text-gray-300 hover:bg-gray-700 cursor-pointer p-2 rounded-md">
        <FiTrash className="mr-2" /> Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default TodoDropdownMenu;