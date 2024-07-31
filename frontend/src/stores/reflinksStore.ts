import {create} from "zustand";
import axios from "axios";
import {toast} from "@/components/ui/use-toast.ts";


interface ReflinksStoreInterface {
    reflinks: any
    createReflink: {
        name: string
        url: string
    }
    updateForm: {
        _id: string
        name: string
        url: string
    }
    fetchReflinks: () => void
    updateCreateFormField: (e: React.ChangeEvent<HTMLInputElement>) => void
    createSingleReflink: (e: React.FormEvent<HTMLFormElement>) => void
    updateSingleReflink: (e: React.FormEvent<HTMLFormElement>) => void
    deleteSingleReflink: (id: string) => void
}


const reflinksStore = create<ReflinksStoreInterface>((set) => {
    return ({
        reflinks: null,
        createReflink: {name: "", url: ""},
        updateForm: {_id: null, name: "", url: ""},
        fetchReflinks: async () => {
            try {
                const res = await axios.get('/reflinks')
                set({
                    reflinks: res.data.reflinks
                })
            } catch (err) {
                console.log(err)
            }
        },
        updateCreateFormField: e => {
            const {name, value} = e.target
            try {
                set((state) => {
                    return {
                        createReflink: {
                            ...state.createReflink, [name]: value,
                        }
                    }
                })
            } catch (err) {
                console.log(err)
            }
        },

        createSingleReflink: async (e) => {
            e.preventDefault();

            const {createReflink, reflinks} = reflinksStore.getState();
            // Check if the fields are not empty
            if (!createReflink.name || !createReflink.url) {
                toast({
                    description: "Fill all inputs.",
                })
                return;
            }
            const res = await axios.post('/reflinks', createReflink);
            set({
                reflinks: [...reflinks, res.data.reflink],
                createReflink: {
                    name: "", url: ''
                },
            });
            toast({
                description: "You create new reflink.",
            })

        },


        deleteReflinks: async (_id) => {
            try {
                await axios.delete(`/reflinks/${_id}`)
                const {reflinks} = reflinksStore.getState()

                const newReflink = reflinks.filter((reflink) => {
                    return reflink._id !== _id
                })
                toast({
                    description: "You delete Reflink",
                })
                set({
                    reflinks: newReflink
                })

            } catch (err) {
                console.log(err)
            }
        },
        handleUpdateFieldChange: (e) => {
            const {value, name} = e.target
            set(state => {
                return {
                    updateForm: {
                        ...state.updateForm,
                        [name]: value
                    }
                }
            })

        },
        toggleUpdate: async (faucet) => {
            const {_id, name, url} = faucet
            set({updateForm: {name, url, _id}})
        },
        updateReflinks: async (e) => {
            try {


                e.preventDefault();
                const {updateForm: {_id, name, url}, reflinks} = reflinksStore.getState();
                const res = await axios.put(`/reflinks/${_id}`, {name, url});
                const newReflink = [...reflinks]
                const reflinkIndex = newReflink.findIndex((reflink) => {
                    return reflink._id === _id
                })
                newReflink[reflinkIndex] = res.data.reflink
                set({reflinks: newReflink, updateForm: {_id: null, name: "", url: ""}})
                toast({
                    description: "You update Reflink",
                })
            } catch (err) {
                console.log(err)
            }
        }


    });
})

export default reflinksStore