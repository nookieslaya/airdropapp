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

import reflinksStore from "@/stores/reflinksStore.ts";

export const CreateReflinks= () => {
    const store = reflinksStore()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Reflink</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Reflink</DialogTitle>
                    <DialogDescription>
                        Create new faucet here
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid  items-center gap-4">
                        <form onSubmit={store.createSingleReflink}>
                            <Label className="text-right">
                                Reflink Name
                            </Label>
                            <Input className='border border-black-100 my-2' type="text" name="name"
                                   value={store.createReflink.name}
                                   onChange={store.updateCreateFormField}/>
                            <Label className="text-right mt-2">
                                Reflink Url
                            </Label>
                            <Input className='border border-black-100 my-2' type="text" name="url"
                                   value={store.createReflink.url}
                                   onChange={store.updateCreateFormField}/>
                            <DialogFooter className='py-6'>
                                <Button className="py-6" type="submit">Create Reflink</Button>
                            </DialogFooter>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
