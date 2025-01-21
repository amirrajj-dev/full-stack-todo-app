import { Priority, Status } from '@prisma/client';
import { boolean, number } from 'zod'
import {create} from 'zustand'


interface Todo {
    id: number;
    title: string;
    priority: Priority;
    status: Status;
    completed: boolean;
    userId: number;
}

interface User {
    name: string;
    email: string;
    isLoggedIn: boolean;
    todos? : Todo[]
}

interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useAuth = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({user }),
}))