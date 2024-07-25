import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {FaEdit} from "react-icons/fa";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import dailyStore from "@/stores/dailyStore.ts";
import {useState} from "react";
export const UpdateDailyTasks = ({daily}) => {

const store = dailyStore()
    const [open, setOpen] = useState(false);


    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <button onSelect={(e) => e.preventDefault()} onClick={() => {
                    store.toggleUpdate(daily)
                }}>
                    <FaEdit />
                </button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] text-muted-foreground">
                <DialogHeader>
                    <DialogTitle>Update Daily Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid  items-center gap-4">
                        <form onSubmit={store.updateDailyTask}>
                            <Label className="text-right">
                                Task Name
                            </Label>
                            <Input className='border border-black-100' type="text"
                                   name="name"
                                   value={store.updateForm.name}
                                   onChange={store.handleUpdateFieldChange}/>
                            <Label className="text-right">
                                Task Url
                            </Label>
                            <Input className='border border-black-100' type="text"
                                   name="url"
                                   value={store.updateForm.url}
                                   onChange={store.handleUpdateFieldChange}/> <Label className="text-right">
                                Task Description
                            </Label>
                            <Input className='border border-black-100' type="text"
                                   name="description"
                                   value={store.updateForm.description}
                                   onChange={store.handleUpdateFieldChange}/>
                            <DialogFooter className='py-6'>
                                <Button onClick={()=>setOpen(false)} className="py-6" type="submit">Update
                                    Task</Button>
                            </DialogFooter>
                        </form>

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    );
};
