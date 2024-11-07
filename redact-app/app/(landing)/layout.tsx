import Navbar from "@/components/NavbarLanding";
import React from "react";

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
