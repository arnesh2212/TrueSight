"use client";

import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "./ui/separator";
import { IoInformationCircleOutline } from "react-icons/io5";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

const levels = [[]];

const Sidebar = () => {
	return (
		<div className="w-1/6 h-full bg-white my-0 mx-0 flex flex-col justify-between p-4 border-r-2 border-gray-200">
			<div>
				<div className="font-bold text-xl">Properties</div>
				<div className="font-light text-sm">Select from the options</div>

				<div className="justify-between mt-3">
					<div className="text-lg">Degree of Redaction</div>
					<div className="my-3">
						<Select>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select degree" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="full">Full</SelectItem>
									<SelectItem value="partial">Partial</SelectItem>
									<SelectItem value="synthetic">Synthetic</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="text-lg">Gradation Level</div>
				<div className="my-3 mb-5">
					<Slider defaultValue={[33]} max={100} step={20} className="" />
				</div>
				<Separator />

				<div className="justify-between mt-3">
					<div className="flex items-center">
						<div className="text-lg mr-2">Demographics</div>
						<HoverCard>
							<HoverCardTrigger asChild>
								<IoInformationCircleOutline />
							</HoverCardTrigger>
							<HoverCardContent className="text-xs">
								sfdsfdsfdf
							</HoverCardContent>
						</HoverCard>
					</div>
					<div className="my-3"></div>
				</div>
			</div>

			<div>
				<Button
					className="w-full text-lg bg-sky-950 hover:bg-sky-900"
					size={"lg"}
				>
					Redact
				</Button>
				<div className="h-16">-</div>
			</div>
		</div>
	);
};

export default Sidebar;
