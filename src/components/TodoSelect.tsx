import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

interface TodoSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string; color: string }[];
}

const TodoSelect: React.FC<TodoSelectProps> = ({ value, onValueChange, options }) => (
  <Select onValueChange={onValueChange}>
    <SelectTrigger className="w-full md:w-[150px] dark:bg-gray-800 dark:border-gray-700 border-gray-600 focus:ring-2 focus:ring-purple-500">
      <SelectValue defaultValue={value} placeholder={value} />
      <span className={`mr-2 inline-block h-2 w-2 rounded-full`}></span>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup className="dark:text-gray-300 dark:bg-gray-800">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="cursor-pointer">
            <span className={`mr-2 inline-block h-2 w-2 rounded-full ${option.color}`}></span>
            {option.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default TodoSelect;