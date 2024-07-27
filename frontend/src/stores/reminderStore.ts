import {create} from "zustand";
import axios from "axios";
import {toast} from "@/components/ui/use-toast.ts";

type Reminder = {
    _id: string;
    name: string;
    url: string;
    date: string;
    description: string;
    color: string;
    complete: boolean;
};

const reminderStore = create((set) => ({
    reminders: null,
    createReminder: {name: "", url: "", date: "", description: "", color: "", complete: false},
    updateForm: {_id: null, name: "", url: "", date: "", description: "", color: "", complete: false},
    fetchReminders: async () => {
        try {
            const res = await axios.get('/reminders')
            set({
                reminders: res.data.reminders
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
                    createReminder: {
                        ...state.createReminder, [name]: value,
                    }
                }
            })
        } catch (err) {
            console.log(err)
        }
    },
    createSingleReminder: async (e: React.FormEvent<HTMLFormElement>): Promise<void>  => {
        e.preventDefault();
        const {createReminder, reminders} = reminderStore.getState();
        // Check if the fields are not empty
        if (!createReminder.name || !createReminder.url) {
            toast({
                description: "Fill all inputs.",
            })
            return;
        }
        const res = await axios.post('/reminders', createReminder);
        set({
            reminders: [...reminders, res.data.reminder],
            createReminder: {
                name: "", url: '', date: '', description: '', color: '', complete: false
            },
        });
        toast({
            description: "You create new Reminder.",
        })


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

    deleteReminder: async (_id) => {
        try {
            await axios.delete(`/reminders/${_id}`);
            set((state) => ({
                reminders: state.reminders.filter((reminder) => reminder._id !== _id),
            }));
            reminderStore.getState().fetchReminders()
            toast({
                description: "You delete Reminder",
            });
        } catch (err) {
            console.log(err);
        }}
}))

export default reminderStore