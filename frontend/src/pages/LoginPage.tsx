import authStore from "@/stores/authStore.ts";
import {useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Link} from "react-router-dom"
import {Label} from "@radix-ui/react-label";
import airdrop  from "../images/Airdrop.png"
export const LoginPage = () => {
    const store = authStore()
    const  navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        await store.login(e)
        navigate("/")
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen lg:h-[90vh]">
            <div className="flex items-center h-full justify-center lg:py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-2">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label>Email</Label>
                                    <Input onChange={store.updateLoginForm} value={store.loginForm.email}
                                           type="email" name="email"/>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Password</Label>
                                    <Input onChange={store.updateLoginForm} value={store.loginForm.password}
                                           type="password" name="password"/>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link to="/register" className="underline">
                                    Sign up
                                </Link>
                            </div>
                            <Button type="submit" className="w-full">Login</Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden z-20 lg:block">
                <img src={airdrop}
                     className="object-contain h-screen dark:brightness-[0.9]"
                />
            </div>
        </div>
    )
};
