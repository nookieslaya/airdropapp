
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
import reminderStore from "@/stores/reminderStore.ts";

export const CreateReminder= () => {
    const store = reminderStore()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">+</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Reminder</DialogTitle>
                    <DialogDescription>
                        Create new freminder here
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid  items-center gap-4">
                        <form onSubmit={store.createSingleReminder}>
                            <Label className="text-right">
                                Reminder Name
                            </Label>
                            <Input className='border border-black-100 my-2' type="text" name="name"
                                   value={store.createReminder.name}
                                   onChange={store.updateCreateFormField}/>
                            <Label className="text-right mt-2">
                                Reminder Url
                            </Label>
                            <Input className='border border-black-100 my-2' type="text" name="url"
                                   value={store.createReminder.url}
                                   onChange={store.updateCreateFormField}/>
                            <Label className="text-right mt-2">
                                Reminder Description
                            </Label>
                            <Input className='border border-black-100 my-2' type="text" name="description"
                                   value={store.createReminder.description}
                                   onChange={store.updateCreateFormField}/> <Label className="text-right mt-2">
                                Reminder date
                            </Label>
                            <Input className='border bg-secondary text-primary border-black-100 my-2' type="date" name="date"
                                   value={store.createReminder.date}
                                   onChange={store.updateCreateFormField}/>
                            <DialogFooter className='py-6'>
                                <Button className="py-6" variant="outline" type="submit">Create faucet</Button>
                            </DialogFooter>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
