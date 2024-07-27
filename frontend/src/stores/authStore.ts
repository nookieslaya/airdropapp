import {create} from 'zustand'
import axios from "axios";




const authStore = create((set) => ({
    loggedIn: null,


    loginForm:{
        email: "",
        password: ""
    },

    signupForm:{
        email: "",
        password: "",
        name: ""
    },

    updateLoginForm: (e) => {
        const {name, value} = e.target
        set((state) => ({
            loginForm: {
                ...state.loginForm,
                [name]: value
            }
        }))
    },
    updateSignupForm: (e) => {
        const {name, value} = e.target
        set((state) => {
            return {
                signupForm: {
                    ...state.signupForm,
                    [name]: value
                }
            }
        })
    },
    login: async () => {
        try {
            const {loginForm} = authStore.getState()
            const res = await axios.post('/login', loginForm )
            set({signupForm: {email: "", password: "", }})
            set({loggedIn: true})
        }catch (e) {
            console.log(e)
        }
    },
    signup: async () => {
        console.log('Signup initiated');

        const {signupForm} = authStore.getState();
        console.log('signupForm', signupForm);

        try {
            const res = await axios.post('/signup', signupForm );
           set({signupForm: {email: "", password: "", name: ""}})
        } catch (e) {
            console.log(e)
        }
    },
    checkAuth: async () => {
        try {
            await axios.get("/check-auth" )
            set({loggedIn: true})
        } catch (e) {
            set({loggedIn: false})
            console.log(e)
        }

    },
    logout: async () => {
        try {
            await axios.get("/logout" )
            set({loggedIn: false})

        } catch (e) {
            console.log(e)
        }
    }


}))

export default authStore