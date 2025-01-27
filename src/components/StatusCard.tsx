import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatusCardProps {
    title: string;
    count: number | string;
    icon: ReactNode;
    color: string;
}

const StatusCard = ({ title, count, icon, color }: StatusCardProps) => {
    return (
        <Card className="bg-white dark:bg-gray-900 shadow-md rounded-md transition-all duration-300 hover:scale-105">
            <CardHeader className="flex items-center">
                <div className={`text-2xl mr-2 ${color}`}>{icon}</div>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xl">{count} {typeof count === 'number' ? 'Tasks' : ''}</p>
            </CardContent>
        </Card>
    );
};

export default StatusCard;