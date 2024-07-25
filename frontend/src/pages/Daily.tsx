import React, {useEffect, useState} from "react";
import dailyStore from "@/stores/dailyStore.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Link} from "react-router-dom";
import {FaTrash} from "react-icons/fa6";
import {CreateDailyTasks} from "@/components/dailyTasks/CreateDailyTasks.tsx";
import {UpdateDailyTasks} from "@/components/dailyTasks/UpdateDailyTasks.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"

const Daily = () => {
    const store = dailyStore()
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        store.fetchDaily()
    }, []);

    const filteredDaily = store.dailyTask ? store.dailyTask.filter((daily) =>
        daily.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        daily.url.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <Card>
            <CardContent className="p-0">
        <div className="daily ">
            <Table className="rounded-2xl">
                <TableHeader>
                    <TableHead>
                        <CardTitle>
                            <h1 className="my-6">Daily Tasks</h1>
                        </CardTitle>
                        <Input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                        />
                    </TableHead>
                </TableHeader>
                <div className="overflow-y-auto w-full">
                    {filteredDaily.map((daily) => {
                        return (
                            <TableBody key={daily._id} className="flex justify-between space-evenly px-6">
                                <TableRow className="flex justify-between items-center w-full" >
                                    <TableCell className="flex w-full ">
                                        <Link to={daily.url} target="_blank">
                                            <span className="font-bold"> {daily.name}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="flex w-full">
                                        <span className="text-primary font-bold">{daily.url}</span>

                                    </TableCell>
                                    <TableCell className=" w-full  ">
                                        <p className="text-muted-foreground font-bold">{daily.description}</p>
                                    </TableCell>

                                    <TableCell className=" flex space-x-4">
                                        <button
                                            onClick={() =>
                                                store.deleteTasks(daily._id)}><FaTrash/>
                                        </button>
                                        <UpdateDailyTasks daily={daily}/>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    })}
                    <div className="flex justify-end py-4">
                        <CreateDailyTasks store={store}/>
                    </div>
                    </div>
            </Table>
        </div>
            </CardContent>
        </Card>
    );
};

export default Daily;