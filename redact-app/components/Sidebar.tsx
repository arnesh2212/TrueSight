import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
	return (
		<div className="pt-60">
			{" "}
			{/* Adjust margin-top to align with navbar height */}
			<Sidebar variant="floating" side="right">
				<SidebarHeader />

				<SidebarContent>
					<SidebarGroup />
					<SidebarGroup />
				</SidebarContent>

				<SidebarFooter>hi</SidebarFooter>
			</Sidebar>
		</div>
	);
}
