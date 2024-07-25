import {toast} from "@/components/ui/use-toast.ts";
import {create} from "zustand";
import axios from "axios";


const dailyStore = create((set) => ({
    dailyTask: null,
    createDaily: {name: "", url: "", description: ""},
    updateForm: {_id: null, name: "", url: "", description: ""},
    fetchDaily: async () => {
        try {
            const res = await axios.get('/daily');
            set({dailyTask: res.data.daily});
        } catch (error) {
            toast({message: "Error fetching daily data", type: "error"});
        }
    },

    updateCreateFormField: e => {
        const {name, value} = e.target
        try {
            set((state) => {
                return {
                    createDaily: {
                        ...state.createDaily, [name]: value,
                    }
                }
            })
        } catch (err) {
            console.log(err)
        }
    },
    createSingleDailyTask: async (e) => {
        e.preventDefault();

        const {createDaily, dailyTask} = dailyStore.getState();
        // Check if the fields are not empty
        if (!createDaily.name || !createDaily.url) {
            toast({
                description: "Fill all inputs.",
            })
            return;
        }
        const res = await axios.post('/daily', createDaily);
        set({
            dailyTask: [...dailyTask, res.data.daily],
            createFaucet: {
                name: "", url: '', description:""
            },

        });
        toast({
            description: "You create new Daily.",
        })


    },
    deleteTasks: async (_id) => {
        try{
            await axios.delete(`/daily/${_id}`);
            const {dailyTask} = dailyStore.getState();

            const newTask = dailyTask.filter((daily) => {
                return daily._id !== _id
            })
            toast({
                description: "You delete Task",
            })
            set({dailyTask: newTask});
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
    toggleUpdate: async (daily) => {
        const {_id, name, url, description} = daily
        set({updateForm: {name, url, _id, description}})
    },
    updateDailyTask: async (e) => {
        try{
            e.preventDefault()
            const {updateForm: {_id, name, url, description},dailyTask} = dailyStore.getState()
            const res = await axios.put(`daily/${_id}`, { name, url ,description});

            const newDailyTask = [...dailyTask]
            const dailyTaskIndex = dailyTask.findIndex(task => {
                return task._id === _id
            })
            newDailyTask[dailyTaskIndex] = res.data.daily

            set({ dailyTask: newDailyTask, updateForm:{ name: "", url: "", _id: null, description: "" } })

            toast({
                description: "Task Updated",
            })
        } catch (err) {
            console.log(err)
        }
    }

    }))


export default dailyStore