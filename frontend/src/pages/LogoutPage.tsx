import {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import authStore from "../stores/authStore.ts";

export const LogoutPage = () => {
    const store = authStore()
    const [count, setCount] = useState(3);

    useEffect(() => {
        const logoutAndRedirect = async () => {
            try {
                store.logout()

                // Start a countdown
                const countDown = setInterval(() => {
                    setCount((currentCount) => {
                        if (currentCount <= 1) {
                            clearInterval(countDown);
                            window.location.href = "/login";
                            return currentCount;
                        }
                        return currentCount - 1;
                    });
                }, 1000);

            } catch (e) {
                console.log(e)
            }
        }

        logoutAndRedirect()

    }, [])

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="text-center w-full md:w-1/2 m-5">
                <CardHeader>
                    <h2 className="text-xl md:text-2xl">You have been logged out</h2>
                </CardHeader>
                <CardContent>
                    <p className="text-md md:text-xl">Redirecting in {count} seconds...</p>
                </CardContent>
            </Card>
        </div>
    );
};