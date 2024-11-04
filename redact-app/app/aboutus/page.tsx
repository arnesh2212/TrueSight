import Image from "next/image";
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


export default function Home() {
  return (
    <div className="">
      <NavigationMenu>
      <NavigationMenuList>
      <NavigationMenuItem>
      <NavigationMenuTrigger>Home</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
      <NavigationMenuTrigger>Developer Info</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
      </NavigationMenuItem>
      </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
