import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input}from "@/components/ui/input";
import { Link } from "react-router-dom";
import { UpdateReflinks } from "@/components/reflinks/UpdateReflinks.tsx";
import CopyButton from "@/components/CopyButton.tsx";
import reflinksStore from "../stores/reflinksStore.ts";
import { CreateReflinks } from "@/components/reflinks/CreateReflinks.tsx";

function Reflinks() {
    const store = reflinksStore();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        store.fetchReflinks();
    }, []);

    const filteredReflinks = store.reflinks ? store.reflinks.filter((reflink) =>
        reflink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reflink.url.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
<Card className="m-0">
    <CardContent className="p-0">
        <div className="reflinks">
            <Table className="rounded-2xl">
                <TableHeader>
                    <TableHead>
                        <CardTitle>
                        <h1 className="my-6">Reflinks</h1>
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
                {filteredReflinks.map((reflink) => (
                    <TableBody key={reflink._id} className="flex justify-between space-evenly px-6 ">
                        <TableRow className="flex hover:bg-accent justify-between w-full items-center px-4">
                            <TableCell className="flex w-full p-0">
                                <Link to={reflink.url} target="_blank">
                                    <span className="font-bold">{reflink.name}</span>
                                </Link>
                            </TableCell>
                            <TableCell className="flex w-full">
                                <span className="text-primary font-bold">{reflink.url}</span>
                                <CopyButton url={reflink.url} />
                            </TableCell>
                            <TableCell className="space-x-4 w-full">

                                <button onClick={() => store.deleteReflinks(reflink._id)}>
                                    <FaTrash />
                                </button>
                                <UpdateReflinks reflink={reflink} />

                            </TableCell>
                        </TableRow>
                    </TableBody>
                ))}
                    </div>
                <div className="flex justify-end py-4">
                    <CreateReflinks store={store} />
                </div>
            </Table>
        </div>
        </CardContent>
</Card>
    );
}
export default Reflinks;