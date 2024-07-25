import authStore from "@/stores/authStore.ts";
import {Link, useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import airdrop from "@/images/Airdrop.png";
import {Label} from "@radix-ui/react-label";

export const SignupPage = () => {
    const store = authStore();
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        await store.signup();

        navigate("/login");

    };
    return (

        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen lg:h-[90vh]">
            <div className="flex items-center h-full justify-center lg:py-12 px-4">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Signup</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email, name and password below to register your account
                        </p>
                    </div>
                    <form onSubmit={handleSignup}>
                        <div className="grid gap-2">
                            <div className="grid gap-4">
                                <div className="grid gap-2"><Label>Email</Label>
                                    <Input onChange={store.updateSignupForm} value={store.signupForm.email}
                                           className="border"
                                           type="email" name="email"/>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Name</Label>
                                    <Input onChange={store.updateSignupForm}
                                           value={store.signupForm.name} className="border"
                                           type="text" name="name"/>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Password</Label>
                                    <Input onChange={store.updateSignupForm} value={store.signupForm.password}
                                           className="border"
                                           type="password" name="password"/>
                                </div>
                                <div className="mt- text-center text-sm">
                                   Already have an account?{" "}
                                    <Link to="/login" className="underline">
                                        Login
                                    </Link>
                                </div>
                                <Button type="Submit">Register</Button>
                            </div>
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

    );
};
