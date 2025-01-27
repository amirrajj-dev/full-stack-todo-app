import {create} from 'zustand';
import { Todo, Priority, Status, Prisma } from '@prisma/client';
import { createTodoAction, getTodosAction, updateTodoAction, deleteTodoAction } from '@/actions/todo.action';
import { toast } from '@/hooks/use-toast';

interface TodoStoreState {
  todos: Todo[];
  setTodos : (todo : Todo[] | [])=>void;
  loading: boolean;
  fetchTodos: () => Promise<void>;
  createTodo: (title: string, priority: Priority) => Promise<void>;
  updateTodo: (id: number, updatedTodo: Partial<Prisma.TodoCreateInput>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  setPriority: (id: number, priority: Priority) => Promise<void>;
  setStatus: (id: number, status: Status) => Promise<void>;
}

const useTodoStore = create<TodoStoreState>(
    (set, get) => ({
      todos: [],
      setTodos(todo) {
        set({todos : todo})
      },
      loading: false,
      fetchTodos: async () => {
        set({ loading: true });
        const res = await getTodosAction();
        if (res.success) {
          set({
            todos: res.todos!.sort((a, b) => {
              if (a.completed && !b.completed) return 1;
              if (!a.completed && b.completed) return -1;
              if (a.priority === 'HIGH' && b.priority !== 'HIGH') return -1;
              if (a.priority !== 'HIGH' && b.priority === 'HIGH') return 1;
              return 0;
            }),
          });
        }
        set({ loading: false });
      },
      createTodo: async (title: string, priority: Priority) => {
        set({ loading: true });
        const res = await createTodoAction({ title, priority });
        if (res.success) {
          toast({
            title: res.message,
            className: 'bg-emerald-600',
          });
          get().fetchTodos();
          set({loading: false});
        } else {
          toast({
            title: res.message,
            variant: 'destructive',
          });
          set({loading: false});
        }
      },
      updateTodo: async (id: number, updatedTodo: Partial<Prisma.TodoCreateInput>) => {
        const res = await updateTodoAction(id, updatedTodo);
        if (res.success) {
          toast({
            title: res.message,
            className: 'bg-emerald-600',
          });
          get().fetchTodos();
        } else {
          toast({
            title: res.message,
            variant: 'destructive',
          });
        }
      },
      deleteTodo: async (id: number) => {
        const res = await deleteTodoAction(id);
        if (res.success) {
          toast({
            title: res.message,
            className: 'bg-emerald-600',
          });
          get().fetchTodos();
        } else {
          toast({
            title: res.message,
            variant: 'destructive',
          });
        }
      },
      setPriority: async (id: number, priority: Priority) => {
        const res = await updateTodoAction(id, { priority });
        if (res.success) {
          toast({
            title: res.message,
            className: 'bg-emerald-600',
          });
          get().fetchTodos();
        } else {
          toast({
            title: res.message,
            variant: 'destructive',
          });
        }
      },
      setStatus: async (id: number, status: Status) => {
        const res = await updateTodoAction(id, { status });
        if (res.success) {
          toast({
            title: res.message,
            className: 'bg-emerald-600',
          });
          get().fetchTodos();
        } else {
          toast({
            title: res.message,
            variant: 'destructive',
          });
        }
      },
    }),
   
  )

export default useTodoStore;