import Faucets from "@/pages/Faucets.tsx";
import Daily from "@/pages/Daily.tsx";
import Reflinks from "@/pages/Reflinks.tsx";
import Reminder from "@/pages/Reminder.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import BG from '/src/images/bg1.png'
import {CardHoverEffectReminder} from "../components/ui/card-hover-effect";
import Navbar from "../components/Navbar";

export const Dashboard = () => {
    return (
        <>
            <Navbar className=""/>
        <div className="flex container gap-10 my-10 flex-col justify-between relative">
            {/*<img src={BG} alt="" className= "absolute opacity-90 w-full  bg-violet-300 left-0 top-0"/>*/}
            <div className="left flex flex-col w-full"><CardHoverEffectReminder/></div>
            <div className="right flex-colflex w-full ">


                <Tabs defaultValue="faucets" className="">
                    <TabsList>
                        <TabsTrigger value="faucets">Faucets</TabsTrigger>
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                        <TabsTrigger value="reflinks">Reflinks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="faucets"> <Faucets/></TabsContent>
                    <TabsContent value="daily"><Daily/></TabsContent>
                    <TabsContent value="reflinks"><Reflinks/></TabsContent>
                </Tabs>
            </div>
        </div>
            </>
    )
};
