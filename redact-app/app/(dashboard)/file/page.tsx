"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { IoInformationCircleOutline } from "react-icons/io5";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const levels = [
	["person name", "city", "state", "country"],
	[
		"person name",
		"city",
		"state",
		"country",
		"phone number",
		"email",
		"pincode",
		"company",
	],
	[
		"person name",
		"city",
		"state",
		"country",
		"phone number",
		"email",
		"pincode",
		"company",
		"DOB",
		"time",
		"address",
		"first name",
		"last name",
		"gender",
	],
	[
		"person name",
		"city",
		"state",
		"country",
		"phone number",
		"email",
		"pincode",
		"company",
		"DOB",
		"time",
		"address",
		"first name",
		"last name",
		"gender",
		"password",
		"credit card",
		"username",
		"ip",
	],
	[
		"person name",
		"city",
		"state",
		"country",
		"phone number",
		"email",
		"pincode",
		"company",
		"DOB",
		"time",
		"address",
		"first name",
		"last name",
		"gender",
		"password",
		"credit card",
		"username",
		"ip",
		"url",
		"social security number",
		"biometric data",
		"bank account number",
		"medical record",
	],
	[
		"person name",
		"city",
		"state",
		"country",
		"phone number",
		"email",
		"pincode",
		"company",
		"DOB",
		"time",
		"address",
		"first name",
		"last name",
		"gender",
		"password",
		"credit card",
		"username",
		"ip",
		"url",
		"social security number",
		"biometric data",
		"bank account number",
		"medical record",
	],
];

export default function Home() {
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");
	const [sliderValue, setSliderValue] = useState(33);
	const [selectedRedactionLevel, setSelectedRedactionLevel] =
		useState("partial");
	const [isFileUploaded, setIsFileUploaded] = useState(false);

	const handleDegreeOfRedactionChange = (value: string) => {
		setSelectedRedactionLevel(value);
	};

	const handleSliderChange = (newValue: number[]) => {
		setSliderValue(newValue[0]);
	};

	const handleRedactText = async () => {
		try {
			// Calculate valid index for levels
			const index = Math.floor(sliderValue / 20); // Clamp to 0–4
			const gradationLevels = levels[index] || []; // Default to empty if out of bounds

			//console.log("Index:", index);
			//console.log("Gradation Levels:", gradationLevels);

			// Prepare JSON payload
			const payload = {
				input: inputText,
				labels: gradationLevels,
				degree: selectedRedactionLevel,
			};

			console.log("Payload:", payload);

			const response = await fetch("http://localhost:2212/text", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) throw new Error("Network response was not ok");

			const data = await response.json();
			console.log("Data:", data);
			setOutputText(data.output);
		} catch (error) {
			console.error("Fetch error:", error);
			setOutputText("Error occurred during redaction");
		}
	};

	const handleFileUpload = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("/api/files", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) throw new Error("Network response was not ok");

			const data = await response.json();
			console.log("File upload response:", data);
			setOutputText(data.output); // Assuming the server returns the redacted text in 'output' field
			setIsFileUploaded(true);
		} catch (error) {
			console.error("Error uploading file:", error);
			setOutputText("Failed to upload file");
		}
	};

	return (
		<div className="flex bg-gray-50 h-screen">
			{isFileUploaded && (
				<div className="w-3/12 h-full bg-white my-0 mx-0 flex flex-col justify-between p-4 border-r-2 border-gray-200">
					<div>
						<div className="font-bold text-2xl">Properties</div>
						<div className="font-light text-sm">Select from the options</div>

						<div className="justify-between mt-3">
							<div className="text-lg">Degree of Redaction</div>
							<div className="my-3">
								<Select onValueChange={handleDegreeOfRedactionChange}>
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
							<Slider
								defaultValue={[sliderValue]}
								max={100}
								step={20}
								onValueChange={handleSliderChange}
								className=""
							/>
						</div>
						{/* <Separator className="mt-10" /> */}

						<Accordion type="single" collapsible className="w-full mt-40">
							<AccordionItem value="item-1">
								<AccordionTrigger>
									<HoverCard>
										<HoverCardTrigger asChild>
											<div className="text-lg">Demographics</div>
										</HoverCardTrigger>
										<HoverCardContent className="text-xs">
											Demographics
										</HoverCardContent>
									</HoverCard>
								</AccordionTrigger>
								<AccordionContent>
									Yes. It adheres to the WAI-ARIA design pattern.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="item-2">
								<AccordionTrigger>
									<HoverCard>
										<HoverCardTrigger asChild>
											<div className="text-lg">
												Personal Identifiable Information
											</div>
										</HoverCardTrigger>
										<HoverCardContent className="text-xs">
											Demographics
										</HoverCardContent>
									</HoverCard>
								</AccordionTrigger>
								<AccordionContent>
									Yes. It comes with default styles that matches the other
									components&apos; aesthetic.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>
									<HoverCard>
										<HoverCardTrigger asChild>
											<div className="text-lg">Sensitive Information</div>
										</HoverCardTrigger>
										<HoverCardContent className="text-xs">
											Demographics
										</HoverCardContent>
									</HoverCard>
								</AccordionTrigger>
								<AccordionContent>
									Yes. It&apos;s animated by default, but you can disable it if
									you prefer.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>

					<div>
						<Button
							className="w-full text-lg bg-sky-950 hover:bg-sky-900"
							size={"lg"}
							onClick={handleRedactText}
						>
							Redact
						</Button>
						<div className="h-16">-</div>
					</div>
				</div>
			)}
			<div className="justify-center w-full flex mt-60">
				<div className="w-400">
					<FileUpload onFileUploaded={handleFileUpload} />
				</div>
			</div>
		</div>
	);
}
```

### `api/files/route.ts`

Ensure that your server-side API is set up to handle file uploads and respond with the redacted text.

```ts
import { type NextRequest, NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import crypto from "node:crypto";

export async function GET() {
	return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
	const data = await request.formData();
	const file: File | null = data.get("file") as unknown as File;

	if (!file) {
		return NextResponse.json({ success: false, message: "No file provided" });
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const hashedFileName = crypto.randomBytes(16).toString("hex");

	try {
		const path = `${process.cwd()}/data/input/${hashedFileName}`;
		await writeFile(path, buffer);
		console.log(`File uploaded to ${path}`);

		// Perform redaction process (example: simulate a response)
		const outputText = "Redacted content...";

		return NextResponse.json({ success: true, output: outputText });
	} catch (error) {
		console.error("Error writing file:", error);
		return NextResponse.json({
			success: false,
			message: "Failed to upload file",
		});
	}
}
