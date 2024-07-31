import {create} from 'zustand'
import axios from "axios";
import {toast} from "@/components/ui/use-toast.ts";


interface FaucetsStore {
    faucets: any | null
    createFaucet: {
        name: string
        url: string
    }
    updateForm: {
        _id: null
        name: string
        url: string
    }
    fetchFaucets: () => void
    updateCreateFormField: (e: React.ChangeEvent<HTMLInputElement>) => void
    createSingleFaucet: (e: React.FormEvent) => void
    updateSingleFaucet: (e: React.FormEvent) => void
    deleteFaucet: (_id: string) => void
}

const faucetsStore = create<FaucetsStore>((set) => {
    return ({

        faucets: null,
        createFaucet: {name: "", url: ""},
        updateForm: {_id: null, name: "", url: ""},
        fetchFaucets: async () => {
            try {
                const res = await axios.get('/faucets')
                set({
                    faucets: res.data.faucets
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
                        createFaucet: {
                            ...state.createFaucet, [name]: value,
                        }
                    }
                })
            } catch (err) {
                console.log(err)
            }
        },

        createSingleFaucet: async (e) => {
            e.preventDefault();

            const {createFaucet, faucets} = faucetsStore.getState();
            // Check if the fields are not empty
            if (!createFaucet.name || !createFaucet.url) {
                toast({
                    description: "Fill all inputs.",
                })
                return;
            }
            const res = await axios.post('/faucets', createFaucet);
            set({
                faucets: [...faucets, res.data.faucet],
                createFaucet: {
                    name: "", url: ''
                },

            });
            toast({
                description: "You create new faucet.",
            })


        },
        deleteFaucets: async (_id) => {
            try {
                await axios.delete(`/faucets/${_id}`);
                const {faucets} = faucetsStore.getState();

                const newFaucet = faucets.filter((faucet) => {
                    return faucet._id !== _id
                })
                toast({
                    description: "You delete Faucet",
                })
                set({faucets: newFaucet})
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
        updateFaucet: async (e) => {
            try {
                e.preventDefault()
                const {updateForm: {_id, name, url}, faucets} = faucetsStore.getState()
                const res = await axios.put(`faucets/${_id}`, {name, url});

                const newFaucets = [...faucets]
                const faucetIndex = faucets.findIndex(faucet => {
                    return faucet._id === _id
                })
                newFaucets[faucetIndex] = res.data.faucet

                set({faucets: newFaucets, updateForm: {name: "", url: "", _id: null}})

                toast({
                    description: "Faucet Updated",
                })
            } catch (err) {
                console.log(err)
            }
        }

    });
})

export default faucetsStore