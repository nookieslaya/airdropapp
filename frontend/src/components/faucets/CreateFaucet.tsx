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
import faucetsStore from "@/stores/faucetsStore.ts";

export const CreateFaucet = () => {
    const store = faucetsStore()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Faucet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Faucet</DialogTitle>
                    <DialogDescription>
                        Create new faucet here
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid  items-center gap-4">
                        <form onSubmit={store.createSingleFaucet}>
                            <Label className="text-right">
                                Faucet Name
                            </Label>
                            <Input className='border border-black-100 my-2' type="text" name="name"
                                   value={store.createFaucet.name}
                                   onChange={store.updateCreateFormField}/>
                            <Label className="text-right mt-2">
                                Faucet Url
                            </Label>
                            <Input className='border border-black-100 my-2' type="text" name="url"
                                   value={store.createFaucet.url}
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
