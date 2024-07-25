
import {LoginPage} from "@/pages/LoginPage.tsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import { Toaster } from "@/components/ui/toaster"
import {SignupPage} from "@/pages/SignupPage.tsx";
import {RequireAuth} from "@/components/RequireAuth.tsx";
import {LogoutPage} from "@/pages/LogoutPage.tsx";
import {Dashboard} from "@/pages/Dashboard.tsx";
import './App.css'


function App() {



    return (
        <div className="text-open-sans bg-background">
            <BrowserRouter>
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                <Navbar/>
                <Routes>
                    <Route index path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<SignupPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                </Routes>
                <Toaster />
        </ThemeProvider>
            </BrowserRouter>
        </div>

    );
}

export default App;
