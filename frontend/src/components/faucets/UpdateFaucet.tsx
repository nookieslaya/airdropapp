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
import faucetsStore from "@/stores/faucetsStore.ts";
import {useState} from "react";
export const UpdateFaucet = ({faucet}) => {

const store = faucetsStore()
    const [open, setOpen] = useState(false);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button onSelect={(e) => e.preventDefault()} onClick={() => {
                    store.toggleUpdate(faucet)
                }}>
                    <FaEdit />
                </button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Faucet</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid  items-center gap-4">
                        <form onSubmit={store.updateFaucet}>
                            <Label className="text-right">
                                Faucet Name
                            </Label>
                            <Input className='border border-black-100' type="text"
                                   name="name"
                                   value={store.updateForm.name}
                                   onChange={store.handleUpdateFieldChange}/>
                            <Label className="text-right">
                                Faucet Url
                            </Label>
                            <Input className='border border-black-100' type="text"
                                   name="url"
                                   value={store.updateForm.url}
                                   onChange={store.handleUpdateFieldChange}/>
                            <DialogFooter className='py-6'>
                                <Button onClick={()=>setOpen(false)} className="py-6" type="submit">Update
                                    faucet</Button>
                            </DialogFooter>
                        </form>

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    );
};
