import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

import dailyStore from "@/stores/dailyStore.ts";

export const CreateDailyTasks = () => {
    const store = dailyStore()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create New Daily</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Daily</DialogTitle>
                    <DialogDescription>
                        Create new Daily here
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid  items-center gap-4">
                        <form onSubmit={store.createSingleDailyTask}>
                            <Label className="text-right">
                                Task Name
                            </Label>
                            <Input className='border border-black-100 my-2' type="text" name="name"
                                   value={store.createDaily.name}
                                   onChange={store.updateCreateFormField}/>
                            <Label className="text-right mt-2">
                                Task Url
                            </Label>
                            <Input className='border border-black-100 my-2' type="text" name="url"
                                   value={store.createDaily.url}
                                   onChange={store.updateCreateFormField}/> <Label className="text-right mt-2">
                                Task Description
                            </Label>
                            <Input className='border border-black-100 my-2' type="text" name="description"
                                   value={store.createDaily.description}
                                   onChange={store.updateCreateFormField}/>
                            <DialogFooter className='py-6'>
                                <Button className="py-6" type="submit">Create Task</Button>
                            </DialogFooter>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
