import {LogOut, User} from 'lucide-react'
import {NavigationMenu} from '@radix-ui/react-navigation-menu'
import {Button} from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {NavigationMenuItem} from './ui/navigation-menu'
import {ModeToggle} from '../components/ui/mode-toggle'
import {Link} from 'react-router-dom'
import authStore from "@/stores/authStore.ts";

const Navbar = () => {
    const store = authStore()
    return (
        <>
            <NavigationMenu className='flex m-2 space-x-2 z-20 flex-row-reverse'>

                <div className='mr-5 z-20 flex'>
                    <NavigationMenuItem className='flex gap-x-4'>
                        {store.loggedIn ? (
                            <Link to='/logout'>
                                <Button variant='outline'>Logout</Button>
                            </Link>
                        ) : (
                            <div>
                                <Link to='/login'>
                                    <Button variant='outline'>Log in</Button>
                                </Link>

                                <Link to='/register'>
                                    <Button variant='outline'>Sign Up</Button>
                                </Link>
                            </div>
                        )}
                        {/*<Link to='/'>*/}
                        {/*    <Button variant='outline'>Home</Button>*/}
                        {/*</Link>*/}
                    </NavigationMenuItem>
                </div>

            </NavigationMenu>
        </>
    )
}

export default Navbar