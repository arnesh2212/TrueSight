"use client";

import { Navbar } from "@/components/NavbarDashboard";
import React from "react";
import {
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandGithub,
    IconBrandX,
    IconExchange,
    IconHome,
    IconNewSection,
    IconTerminal2,
} from "@tabler/icons-react";
import Sidebar from "@/components/Sidebar2";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Products",
            icon: (
                <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Components",
            icon: (
                <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Aceternity UI",
            icon: (
                <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Changelog",
            icon: (
                <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Twitter",
            icon: (
                <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
    ];

    return (
        <div className="bg-gray-400 h-screen flex flex-col">
            <header className="sticky top-0 z-40">
                <Navbar />
            </header>
            <div className="flex flex-1 h-full">
                <SidebarProvider>
                    <Sidebar />
                    <main className="flex-1">
                        {children}
                    </main>
                </SidebarProvider>
            </div>
            <div className="mt-2 mb-2 flex items-center justify-center z-10 sticky bottom-0">
                <FloatingDock
                    mobileClassName="translate-y-20"
                    items={links}
                />
            </div>
        </div>
    );
}
