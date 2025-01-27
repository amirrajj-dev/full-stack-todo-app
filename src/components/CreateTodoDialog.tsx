"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectValue,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectGroup,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Priority } from "@prisma/client";
import useTodoStore from "@/store/todo.store";

const CreateTodoDialog = () => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("-1");
  const {createTodo} = useTodoStore()

  const handleCreateTodo = async () => {
    if (!title.trim()){
      toast({
        title: "Title is required",
        variant: "destructive",
      })
      return;
    }
    if (+priority === -1){
      toast({
        title: "Priority is required",
        variant: "destructive", 
      })
      return;
    }
  await createTodo(title , priority as Priority)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-center gap-2 rounded-md p-2 text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
        >
          <FaPlus />
          <span>Add Todo</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-4 bg-white dark:bg-gray-900 rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new task.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full dark:border-gray-600"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <Label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </Label>
            <div className="flex items-center gap-2">
              <Select onValueChange={(value) => setPriority(value)} >
                <SelectTrigger className="mt-1 dark:border-gray-600">
                  <SelectValue placeholder="Select The Priority" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-900">
                  <SelectGroup className="dark:text-gray-200 border-none outline-none">
                    <SelectItem value="LOW">
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500 -translate-y-px"></span>
                      LOW
                    </SelectItem>
                    <SelectItem value="MEDIUM">
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-yellow-500 -translate-y-px"></span>
                      MEDIUM
                    </SelectItem>
                    <SelectItem value="HIGH">
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-500 -translate-y-px"></span>
                      HIGH
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleCreateTodo}
              className="rounded-md p-2 text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
            >
              Create
            </Button>
            <DialogClose asChild>
              <Button variant="secondary" className="ml-2 rounded-md p-2">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoDialog;