import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Navbar() {
	return (
		<div className="relative flex py-3 w-full bg-white items-center border-gray-200 border-b-2">
			{/* Logo Section */}
			<div className="pl-10 pr-20 cursor-pointer">
				<Image src={"Logo1.svg"} width={150} height={40} alt="REDACT-Logo" />
			</div>

			<div className="absolute left-1/2 transform -translate-x-1/2">
				<Tabs defaultValue="Text">
					<TabsList className="grid grid-cols-2">
						<TabsTrigger
							value="Text"
							onClick={() => {
								redirect("/text");
							}}
						>
							Text
						</TabsTrigger>
						<TabsTrigger
							value="File"
							onClick={() => {
								redirect("/file");
							}}
						>
							File
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
		</div>
	);
}
