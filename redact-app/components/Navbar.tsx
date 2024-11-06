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
            <div className="pl-5 pr-20 flex justify-end cursor-pointer">
                <Image src={'Logo1.svg'} width={150} height={40}></Image>
            </div>
            <div className="flex justify-center">

                <NavigationMenu className="">
                    <NavigationMenuList>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-xl">Home</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-xl">About Us</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-xl">Developer Info</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

            </div>
        </div>
    )
}

export default Navbar;
