import { Navbar } from "@/components/NavbarDashboard";
import React from "react";
import {
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>

            <header className="sticky top-0 z-50">
                <Navbar></Navbar>
            </header>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>

        </div>
    );
}
