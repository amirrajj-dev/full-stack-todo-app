import React, { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import TodoInput from "./TodoInput";
import TodoSelect from "./TodoSelect";
import TodoDropdownMenu from "./TodoDropDownMenu";
import TodoButton from "./TodoButton";
import { toast } from "@/hooks/use-toast";
import { Priority, Prisma, Status } from "@prisma/client";

interface TodoProps {
  todo: {
    id: number;
    title: string;
    priority: string;
    status: string;
  };
  onEdit: (
    id: number,
    updatedTodo: Partial<Prisma.TodoCreateInput>
  ) => Promise<void>;
  onDelete: (id: number) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
  onStatusChange: (id: number, status: Status) => void;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  onEdit,
  onDelete,
  onPriorityChange,
  onStatusChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [priority, setPriority] = useState(todo.priority);
  const [status, setStatus] = useState(todo.status);
  const [originalTitle, setOriginalTitle] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
      onEdit(todo.id, { title, priority : priority as Priority, status : status as Status });
    } else {
      setOriginalTitle(title);
      setIsEditing(true);
    }
  };

  const handleUndo = () => {
    setTitle(originalTitle);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(todo.title);
    toast({
      title: "Todo copied to clipboard",
     className: "bg-emerald-600",
    })
  };

  return (
    <div className="todo-item p-6 mb-4 dark:bg-gray-900 shadow-lg rounded-lg flex flex-col md:flex-row items-center justify-between transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
      <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
        {isEditing ? (
          <TodoInput value={title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          <h3 className="text-lg font-extrabold dark:text-white transition-all duration-300">
            {todo.title}
          </h3>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TodoSelect
          value={priority}
          onValueChange={(value) => {
            setPriority(value);
            onPriorityChange(todo.id, value as Priority);
          }}
          options={[
            { value: "LOW", label: "Low", color: "bg-green-500" },
            { value: "MEDIUM", label: "Medium", color: "bg-yellow-500" },
            { value: "HIGH", label: "High", color: "bg-red-500" },
          ]}
        />
        <TodoSelect
          value={status}
          onValueChange={(value) => {
            setStatus(value);
            onStatusChange(todo.id, value as Status);
          }}
          options={[
            { value: "PENDING", label: "Pending", color: "bg-blue-500" },
            { value: "IN_PROGRESS", label: "In Progress", color: "bg-orange-500" },
            { value: "COMPLETED", label: "Completed", color: "bg-green-500" },
          ]}
        />
        {isEditing ? (
          <div className="flex gap-2">
            <TodoButton
              onClick={handleEdit}
              className="bg-green-600 hover:bg-green-700"
            >
              <FiCheck />
            </TodoButton>
            <TodoButton
              onClick={handleUndo}
              className="bg-red-600 hover:bg-red-700"
            >
              <FiX />
            </TodoButton>
          </div>
        ) : (
          <TodoDropdownMenu
            onEdit={handleEdit}
            onCopy={handleCopy}
            onDelete={() => onDelete(todo.id)}
          />
        )}
      </div>
    </div>
  );
};

export default Todo;