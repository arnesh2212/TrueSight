"use client";

import { ReactNode } from "react";
import Navbar from "@/components/NavbarDashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar2";

type LayoutProps = {
	children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="bg-gray-200 h-screen flex flex-col">
			<div className="flex flex-1 h-4/5">
				{/* <Sidebar /> */}
				<main className="flex-1 overflow-auto">{children}</main>
			</div>
		</div>
	);
}
