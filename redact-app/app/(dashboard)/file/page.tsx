"use client";

import { useState } from "react";
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
import ServerUploadPage from "@/components/fileuploadtry";

const labels = [
	[
		"Credit Card Number",
		"Debit Card Number",
		"Credit Card Expiration Date",
		"Credit Card CVV/CVC",
		"Bank Account Number",
		"IBAN",
		"Routing Number",
		"SWIFT/BIC Code",
		"Private Keys",
		"API Keys",
		"Encryption Keys",
		"Password",
		"Session Tokens",
		"Authentication Tokens",
		"Digital Wallet ID",
		"Cryptocurrency Wallet Address",
	],
	// Priority 2
	[
		"Credit Card Number",
		"Debit Card Number",
		"Credit Card Expiration Date",
		"Credit Card CVV/CVC",
		"Bank Account Number",
		"IBAN",
		"Routing Number",
		"SWIFT/BIC Code",
		"Private Keys",
		"API Keys",
		"Encryption Keys",
		"Password",
		"Session Tokens",
		"Authentication Tokens",
		"Digital Wallet ID",
		"Cryptocurrency Wallet Address",
		"Full Name",
		"First Name",
		"Last Name",
		"Middle Name",
		"Date of Birth",
		"Place of Birth",
		"Social Security Number (SSN)",
		"National ID Number",
		"Passport Number",
		"Driver's License Number",
		"Identity Card Number",
		"Tax Identification Number (TIN)",
		"CPF",
		"CNPJ",
		"Gender",
	],
	// Priority 3
	[
		"Credit Card Number",
		"Debit Card Number",
		"Credit Card Expiration Date",
		"Credit Card CVV/CVC",
		"Bank Account Number",
		"IBAN",
		"Routing Number",
		"SWIFT/BIC Code",
		"Private Keys",
		"API Keys",
		"Encryption Keys",
		"Password",
		"Session Tokens",
		"Authentication Tokens",
		"Digital Wallet ID",
		"Cryptocurrency Wallet Address",
		"Full Name",
		"First Name",
		"Last Name",
		"Middle Name",
		"Date of Birth",
		"Place of Birth",
		"Social Security Number (SSN)",
		"National ID Number",
		"Passport Number",
		"Driver's License Number",
		"Identity Card Number",
		"Tax Identification Number (TIN)",
		"CPF",
		"CNPJ",
		"Gender",
		"Medical Condition",
		"Diagnosis",
		"Medication",
		"Treatment Plan",
		"Health Insurance Number",
		"National Health Insurance Number",
		"Doctor's Name",
		"Hospital Name",
		"Vaccination Record",
		"Court Case Number",
		"Prisoner ID",
		"Visa Number",
		"Passport Expiration Date",
		"Immigration Status",
	],
	// Priority 4
	[
		"Credit Card Number",
		"Debit Card Number",
		"Credit Card Expiration Date",
		"Credit Card CVV/CVC",
		"Bank Account Number",
		"IBAN",
		"Routing Number",
		"SWIFT/BIC Code",
		"Private Keys",
		"API Keys",
		"Encryption Keys",
		"Password",
		"Session Tokens",
		"Authentication Tokens",
		"Digital Wallet ID",
		"Cryptocurrency Wallet Address",
		"Full Name",
		"First Name",
		"Last Name",
		"Middle Name",
		"Date of Birth",
		"Place of Birth",
		"Social Security Number (SSN)",
		"National ID Number",
		"Passport Number",
		"Driver's License Number",
		"Identity Card Number",
		"Tax Identification Number (TIN)",
		"CPF",
		"CNPJ",
		"Gender",
		"Medical Condition",
		"Diagnosis",
		"Medication",
		"Treatment Plan",
		"Health Insurance Number",
		"National Health Insurance Number",
		"Doctor's Name",
		"Hospital Name",
		"Vaccination Record",
		"Court Case Number",
		"Prisoner ID",
		"Visa Number",
		"Passport Expiration Date",
		"Immigration Status",
		"IP Address",
		"MAC Address",
		"Device ID",
		"Username",
		"Security Question and Answer",
		"Digital Signature",
		"Hash Values",
		"Network Configuration Data",
		"Firewall Logs",
		"Malware Signatures",
		"URL",
		"Website Domain",
	],
	// Priority 5
	[
		"Credit Card Number",
		"Debit Card Number",
		"Credit Card Expiration Date",
		"Credit Card CVV/CVC",
		"Bank Account Number",
		"IBAN",
		"Routing Number",
		"SWIFT/BIC Code",
		"Private Keys",
		"API Keys",
		"Encryption Keys",
		"Password",
		"Session Tokens",
		"Authentication Tokens",
		"Digital Wallet ID",
		"Cryptocurrency Wallet Address",
		"Full Name",
		"First Name",
		"Last Name",
		"Middle Name",
		"Date of Birth",
		"Place of Birth",
		"Social Security Number (SSN)",
		"National ID Number",
		"Passport Number",
		"Driver's License Number",
		"Identity Card Number",
		"Tax Identification Number (TIN)",
		"CPF",
		"CNPJ",
		"Gender",
		"Medical Condition",
		"Diagnosis",
		"Medication",
		"Treatment Plan",
		"Health Insurance Number",
		"National Health Insurance Number",
		"Doctor's Name",
		"Hospital Name",
		"Vaccination Record",
		"Court Case Number",
		"Prisoner ID",
		"Visa Number",
		"Passport Expiration Date",
		"Immigration Status",
		"IP Address",
		"MAC Address",
		"Device ID",
		"Username",
		"Security Question and Answer",
		"Digital Signature",
		"Hash Values",
		"Network Configuration Data",
		"Firewall Logs",
		"Malware Signatures",
		"URL",
		"Website Domain",
		"Email Address",
		"Mobile Phone Number",
		"Landline Phone Number",
		"Fax Number",
		"Social Media Handle",
		"Postal Address",
		"ZIP/Postal Code",
		"City",
		"State",
		"Country",
		"Employer Name",
		"Job Title",
		"Employee ID",
		"Work Email",
		"Work Phone Number",
		"Salary Information",
		"Benefits Details",
	],
	// Priority 6
	[
		"Credit Card Number",
		"Debit Card Number",
		"Credit Card Expiration Date",
		"Credit Card CVV/CVC",
		"Bank Account Number",
		"IBAN",
		"Routing Number",
		"SWIFT/BIC Code",
		"Private Keys",
		"API Keys",
		"Encryption Keys",
		"Password",
		"Session Tokens",
		"Authentication Tokens",
		"Digital Wallet ID",
		"Cryptocurrency Wallet Address",
		"Full Name",
		"First Name",
		"Last Name",
		"Middle Name",
		"Date of Birth",
		"Place of Birth",
		"Social Security Number (SSN)",
		"National ID Number",
		"Passport Number",
		"Driver's License Number",
		"Identity Card Number",
		"Tax Identification Number (TIN)",
		"CPF",
		"CNPJ",
		"Gender",
		"Medical Condition",
		"Diagnosis",
		"Medication",
		"Treatment Plan",
		"Health Insurance Number",
		"National Health Insurance Number",
		"Doctor's Name",
		"Hospital Name",
		"Vaccination Record",
		"Court Case Number",
		"Prisoner ID",
		"Visa Number",
		"Passport Expiration Date",
		"Immigration Status",
		"IP Address",
		"MAC Address",
		"Device ID",
		"Username",
		"Security Question and Answer",
		"Digital Signature",
		"Hash Values",
		"Network Configuration Data",
		"Firewall Logs",
		"Malware Signatures",
		"URL",
		"Website Domain",
		"Email Address",
		"Mobile Phone Number",
		"Landline Phone Number",
		"Fax Number",
		"Social Media Handle",
		"Postal Address",
		"ZIP/Postal Code",
		"City",
		"State",
		"Country",
		"Employer Name",
		"Job Title",
		"Employee ID",
		"Work Email",
		"Work Phone Number",
		"Salary Information",
		"Benefits Details",
		"Reservation Codes",
		"Flight Number",
		"Train Ticket Number",
		"Vehicle Registration Number",
		"License Plate Number",
		"Loyalty Program Numbers",
		"Library Card Number",
		"Membership Numbers",
		"Serial Numbers",
		"Organization/Company Name",
		"Professional License Number",
		"Patent Number",
		"Trademark Number",
		"Degree Information",
		"Enrollment Number",
		"Graduation Date",
		"Certifications",
	],
];

export default function Home() {
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");
	const [sliderValue, setSliderValue] = useState(33);
	const [selectedRedactionLevel, setSelectedRedactionLevel] =
		useState("partial");
	const [isFileUploaded, setIsFileUploaded] = useState(false);
	let file;

	const handleDegreeOfRedactionChange = (value: string) => {
		setSelectedRedactionLevel(value);
	};

	const handleSliderChange = (newValue: number[]) => {
		setSliderValue(newValue[0]);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return;
		file = e.target.files[0];
		setIsFileUploaded(true);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files && files.length > 0) {
			file = files[0];
			setIsFileUploaded(true);
		}
	};

	const handleUpload = async () => {
		if (!file) return;
		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("/api/files", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					file,
					sliderValue,
					selectedRedactionLevel,
				}),
			});

			if (!response.ok) throw new Error("Network response was not ok");

			const data = await response.json();
			console.log("File uploaded successfully:", data);
			setIsFileUploaded(true);
		} catch (error) {
			console.error("Upload error:", error);
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
									Yes. It comes with default styles that match the other
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
							onClick={() => {}}
						>
							Redact
						</Button>
						<div className="h-16">-</div>
					</div>
				</div>
			)}
			<ServerUploadPage />
			{/* <div className="justify-center w-full flex mt-60">
				<div className="w-400 bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
					<label
						htmlFor="file"
						className="text-sm font-medium text-gray-500 cursor-pointer mb-2"
					>
						Drag and drop a file or click to browse
					</label>
					<input
						id="file"
						type="file"
						accept="/"
						onChange={handleFileChange}
						className="hidden"
					/>
					<div
						className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center"
						onDrop={handleDrop}
						onDragOver={(e) => e.preventDefault()}
					>
						<FileIcon className="w-12 h-12 text-gray-500 mr-4" />
						<span className="text-sm font-medium text-gray-500">
							Select a file
						</span>
					</div>
					<Button onClick={handleUpload} className="mt-4">
						Upload
					</Button>
				</div>
			</div> */}
		</div>
	);
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
			<path d="M14 2v4a2 2 0 0 0 2 2h4" />
		</svg>
	);
}
