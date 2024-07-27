import {cn} from "../../lib/utils";
import {AnimatePresence, motion} from "framer-motion";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import reminderStore from "../../stores/reminderStore";
import reminder from "../../pages/Reminder";
import {Skeleton} from "./skeleton";
import Countdown from "../reminder/Countdown";
import {CreateReminder} from "../reminder/CreateReminder";
import {TextGenerateEffect} from "./textgenerate";
import {FaTrash} from "react-icons/fa6";
import {HoveredCardBG} from "./HoveredCardBG";

export const CardHoverEffectReminder = ({className}: { items: { title: string; description: string; link: string; date: string; }[];
    className?: string;
}) => {
    useEffect(() => {
        store.fetchReminders();
    }, []);

    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const store = reminderStore();

    return (
        <div>
            <div className="w-full flex justify-end items-center gap-4 text-2xl">
                <p>Create New Reminder</p>
                <CreateReminder reminder={reminder}/>
            </div>


            <div
                className={cn(
                    "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
                    className
                )}
            >
                {!store.reminders ? (
                    <p className="w-[100px] h-[20px] rounded-full"></p>
                ) : ([...store.reminders].sort((a, b) => new Date(a.date) - new Date(b.date)).map((reminder, idx) => (
                    <div
                        key={reminder.id}

                        className="relative group  block p-2 h-full w-full"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >

                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                                    layoutId="hoverBackground"
                                    initial={{opacity: 0}}
                                    animate={{
                                        opacity: 1,
                                        transition: {duration: 0.15},
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: {duration: 0.15, delay: 0.2},
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <Card>

                            <CardTitle className="p-0">
                                <div className="flex justify-between items-center">
                                    <h3><TextGenerateEffect className="text-xl " words={reminder.name}/></h3>
                                    <div>
                                        <button
                                            onClick={() => store.deleteReminder(reminder._id)}
                                        >
                                            <FaTrash className="mt-4 w-4 ml-3"/>
                                        </button>
                                    </div>
                                </div>
                            </CardTitle>
                            <Link to={reminder.url} target="_blank"><TextGenerateEffect className="text-[12px]"
                                                                                        words={reminder.url}/>
                            </Link>
                            <CardDescription><TextGenerateEffect className="text-[12px]" words={reminder.description}/></CardDescription>
                            <p className="text-orbitron mt-3">
                                <Countdown className={`${
                                    new Date(reminder.date).toLocaleDateString() === new Date().toLocaleDateString()
                                        ? 'text-red-500'
                                        : new Date(reminder.date) < new Date()
                                            ? 'text-red-500 '
                                            : 'text-green-600 '
                                }`} date={reminder.date}/>
                            </p>

                        </Card>

                    </div>)
                ))}

            </div>
        </div>
    );
};

export const Card = ({
                         className,
                         children,
                     }: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full px-2 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
                              className,
                              children,
                          }: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("text-zinc-100 font-bold tracking-wide ", className)}>
            {children}
        </h4>
    );
};
export const CardDescription = ({
                                    className,
                                    children,
                                }: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
                className
            )}
        >
            {children}

        </p>
    );
};
