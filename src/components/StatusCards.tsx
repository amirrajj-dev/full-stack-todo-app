import { FaExclamationCircle, FaCheckCircle, FaTasks, FaSpinner } from "react-icons/fa";
import prisma from "../../utils/prisma";
import { getCurrentUserAction } from "@/actions/auth.action";
import StatusCard from "@/components/StatusCard";

const StatusCards = async () => {
    const user = (await getCurrentUserAction())?.user;
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center">
                <FaExclamationCircle className="text-red-600 text-6xl mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No User Logged In</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Please log in to view your todos.
                </p>
            </div>
        );
    }

    const completedTodosCount = await prisma.todo.count({
        where: {
            userId: user.id,
            completed: true,
        },
    });

    const pendingTodosCount = await prisma.todo.count({
        where: {
            userId: user.id,
            completed: false,
        },
    });

    const progress = completedTodosCount + pendingTodosCount > 0
        ? (completedTodosCount / (pendingTodosCount + completedTodosCount)) * 100
        : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusCard 
                title="Completed Todos" 
                count={completedTodosCount} 
                icon={<FaCheckCircle />} 
                color="text-emerald-600" 
            />
            <StatusCard 
                title="Pending Todos" 
                count={pendingTodosCount} 
                icon={<FaTasks />} 
                color="text-yellow-600" 
            />
            <StatusCard 
                title="Progress" 
                count={`${progress.toFixed(2)}%`} 
                icon={<FaSpinner />} 
                color="text-blue-600" 
            />
        </div>
    );
};

export default StatusCards;