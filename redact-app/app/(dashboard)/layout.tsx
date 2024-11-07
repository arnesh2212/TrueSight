import { Navbar } from "@/components/NavbarDashboard";
import React from "react";
import Image from 'next/image'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <header className="sticky top-0 z-50">
            <Navbar></Navbar>
        </header>


    );
}
