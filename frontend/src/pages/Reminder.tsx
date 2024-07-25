import reminderStore from "../stores/reminderStore";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Countdown from "@/components/reminder/Countdown.tsx";
import {FaTrash} from "react-icons/fa6";
import {CreateReminder} from "@/components/reminder/CreateReminder.tsx";

const Reminder = ({reminder}) => {
    const store = reminderStore();

    useEffect(() => {
        store.fetchReminders();
    }, []);

    return (
        <div className="flex flex-wrap gap-2">
            {!store.reminders ? (
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
            ) : (
                [...store.reminders].sort((a, b) => new Date(a.date) - new Date(b.date)).map((reminder) => (
                    <Card className={`${
                        new Date(reminder.date).toLocaleDateString() === new Date().toLocaleDateString()
                            ? 'bg-red-500/10'
                            : new Date(reminder.date) < new Date()
                                ? 'bg-red-500/10 '
                                : 'bg-green-600/10 '
                    }`}>
                        <div className={`bg-${reminder.color}`}>
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex justify-between items-center">
                                        <h3>{reminder.name}</h3>
                                        <div>
                                            <button
                                                onClick={() => store.deleteReminder(reminder._id)}
                                            >
                                                <FaTrash className="w-4 ml-3"/>
                                            </button>
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className={`${
                                    new Date(reminder.date).toLocaleDateString() === new Date().toLocaleDateString()
                                        ? 'text-red-500 font-bold'
                                        : new Date(reminder.date) < new Date()
                                            ? 'text-red-500 font-bold'
                                            : 'text-green-600 font-bold'
                                }`} >
                                    {new Date(reminder.date).toLocaleDateString()}
                                </p>
                                <p className="py-2">{reminder.description}</p>
                                <p>{reminder.color}</p>
                                <p>{reminder.url}</p>
                                <p>{reminder.complete}</p>
                            </CardContent>
                            <CardFooter>
                                <p className="text-orbitron">
                                    <Countdown date={reminder.date} />
                                </p>
                            </CardFooter>
                        </div>
                    </Card>
                ))
            )}
            <CreateReminder reminder={reminder}/>
        </div>
    );
};

export default Reminder;