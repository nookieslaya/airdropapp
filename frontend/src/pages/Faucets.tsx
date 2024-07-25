import {useEffect, useState} from "react";
import faucetsStore from '../stores/faucetsStore.ts'
import { FaTrash } from "react-icons/fa6";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import {Link} from "react-router-dom";
import {CreateFaucet} from "@/components/faucets/CreateFaucet.tsx";
import {UpdateFaucet} from "@/components/faucets/UpdateFaucet.tsx";
import {Input} from "@/components/ui/input.tsx";

function Faucets() {
    const store = faucetsStore()
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        store.fetchFaucets()
    }, []);
    const filteredFaucets = store.faucets ? store.faucets.filter((faucet) =>
        faucet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faucet.url.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];


    return (
        <Card>
            <CardContent className="p-0">
        <div className="faucets  ">
            <Table className=" rounded-2xl">
                <TableHeader>
                    <TableHead>
                        <CardTitle>
                        <h1 className="my-6">Faucets</h1>
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
                {filteredFaucets && Array.isArray(filteredFaucets) && filteredFaucets.map((faucet) => {
                    return (
                        <TableBody className="flex justify-between space-evenly px-6" key={faucet._id}>
                            <TableRow className="flex justify-between items-center w-full" >
                                <TableCell className="flex w-full">
                                    <Link to={faucet.url} target="_blank">
                                        <span className="font-bold"> {faucet.name}</span>
                                    </Link>
                                </TableCell>
                                <TableCell className="w-full">
                                    <span className="text-primary font-bold">{faucet.url}</span>
                                </TableCell>

                                <TableCell className="flex w-full space-x-4">
                                    <button
                                        onClick={() => store.deleteFaucets(faucet._id)}><FaTrash />
                                    </button>
                                    <UpdateFaucet  faucet={faucet} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    );
                })}
                </div>
                <div className="flex justify-end py-4">
                  <CreateFaucet store={store}/>
                </div>
            </Table>
            
        </div>
            </CardContent>
        </Card>
    );
}

export default Faucets;
