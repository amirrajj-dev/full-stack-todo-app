import { getCurrentUserAction, logOutAction, signInAction, signUpAction } from '@/actions/auth.action';
import { toast } from '@/hooks/use-toast';
import { SignUpType } from '@/validations/signup.validation';
import { Priority, Status } from '@prisma/client';
import { create } from 'zustand'

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
    password: string;
    todos?: Todo[]
}

interface AuthStore {
    user: User | null;
    setUser: (user: User | null) => void;
    getUser: () => void;
    isLoading: boolean;
    signup : (formdata : SignUpType)=>void;
    logout : ()=>void;
    login : (formdata : Pick<User , 'email' | 'password'>)=>void;
}

export const useAuth = create<AuthStore>((set) => ({
    user: null,
    isLoading: false,
    setUser: (user) => set({ user }),
    async getUser() {
        set({ isLoading: true })
        const res = await getCurrentUserAction()
        if (res?.user) {
            set({ user: res.user, isLoading: false })
        } else {
            set({ user: null, isLoading: false })
        }
    },
    signup : async (formdata)=>{
        set({ isLoading: true })
        const res = await signUpAction(formdata)
        if (res.success) {
            set({ user: res.user })
            toast({
                title: res.message,
                className: 'bg-emerald-600'
            })
            return {
                success: true
            }
        }else{
            set({ isLoading: false })
            toast({
                title : res?.message,
                variant : 'destructive'
            })
            return {
                success: false
            }
        }
    },
    logout: async () => {
        const res = await logOutAction()
        if (res.success){
            set({ user: null })
            toast({
                title: res.message,
                className: 'bg-emerald-600'
            })
        }
    },
    login: async (formdata) => {
        const res = await signInAction(formdata)
        if (res.success){
            set({ user: res.user })
            toast({
                title : res.message,
                className : 'bg-emerald-600'
            })
            return {
                success: true
            }
        }else{
            toast({
                title : res?.message,
                variant : 'destructive'
            })
            return {
                success: false
            }
        }
    }
}))