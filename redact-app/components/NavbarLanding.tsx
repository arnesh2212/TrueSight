"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="flex py-3 w-full bg-white">
            <div className="pl-10 pr-20 flex justify-end cursor-pointer">
                <Image src={'Logo1.svg'} width={150} height={40} alt="REDACT-Logo"></Image>
            </div>
            <div className="flex justify-center">

                <NavigationMenu className="">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-xl">Home</NavigationMenuTrigger>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-xl">About Us</NavigationMenuTrigger>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-xl">Developer Info</NavigationMenuTrigger>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

            </div>
        </div>
    )
}

export default Navbar;
