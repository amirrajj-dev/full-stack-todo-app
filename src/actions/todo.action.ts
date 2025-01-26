"use server";
import prisma from "../../utils/prisma";
import { Prisma } from "@prisma/client";
import { getCurrentUserAction } from "./auth.action";
import { revalidatePath } from "next/cache";

export const createTodoAction = async (
  todo: Pick<Prisma.TodoCreateInput, "title" | "priority">
) => {
  try {
    const currentUser = (await getCurrentUserAction())?.user;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    const isTodoTitleExistInCurrentUserTodos = await prisma.todo.findFirst({
      where: {
        userId: currentUser.id,
        title: todo.title,
      },
    });

    if (isTodoTitleExistInCurrentUserTodos) {
      return {
        success: false,
        message: "Todo with this Title already exists in your todos",
      };
    }

    // Create todo for the current user
    const newTodo = await prisma.todo.create({
      data: {
        ...todo,
        status: "PENDING",
        completed: false,
        user: { connect: { id: currentUser.id } },
      },
    });

    if (!newTodo) {
      return {
        success: false,
        message: "Failed to create todo, try again later",
      };
    }

    revalidatePath("/");

    return {
      success: true,
      todo: newTodo,
      message: "Todo created successfully",
    };
  } catch (error) {
    console.error("Error creating todo:", error);
    return {
      success: false,
      message: "An error occurred while creating the todo",
      error,
    };
  }
};

export const getTodosAction = async () => {
  try {
    const currentUser = (await getCurrentUserAction())?.user;
    if (!currentUser) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        user: true,
      },
    });
    return {
      success: true,
      todos,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching todos",
      error,
    };
  }
};

export const updateTodoAction = async (
  todoID: number,
  newTodo: Partial<Prisma.TodoCreateInput>
) => {
  try {
    const currentUser = (await getCurrentUserAction())?.user;
    if (!currentUser) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const isTodoExist = await prisma.todo.findFirst({
      where: { id: todoID, userId: currentUser.id },
    });
    if (!isTodoExist) {
      return {
        success: false,
        message: "Todo not found or not authorized to update",
      };
    }

    // Update todo for the current user
    const updatedTodo = await prisma.todo.update({
      where: { id: todoID },
      data: {
        ...newTodo,
        completed: newTodo.status === "COMPLETED" ? true : false,
      },
      include: {
        user: true,
      },
    });
    revalidatePath("/");
    return {
      success: true,
      todo: updatedTodo,
      message: "Todo updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while updating the todo",
      error,
    };
  }
};

export const deleteTodoAction = async (todoID: number) => {
  try {
    const currentUser = (await getCurrentUserAction())?.user;
    if (!currentUser) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const isTodoExist = await prisma.todo.findFirst({
      where: { id: todoID, userId: currentUser.id },
    });
    if (!isTodoExist) {
      return {
        success: false,
        message: "Todo not found or not authorized to delete",
      };
    }
    // Delete todo for the current user
    await prisma.todo.delete({
      where: { id: todoID },
    })
    revalidatePath("/");
    return {
      success: true,
      message: "Todo deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while deleting the todo",
      error,
    };
  }
};
