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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, CheckCircle2 } from "lucide-react";

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
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setIsUploaded(false);
		}
	};

	const handleUpload = async () => {
		if (!file) return;

		setIsUploading(true);

		try {
			// Create a FormData object to send the file
			const formData = new FormData();
			formData.append("filePath", file.path); // Use file.name instead of file.path

			// Send the POST request to the server using fetch
			await fetch("/api/file", {
				method: "POST",
				body: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("File uploaded:", file.name);
			setIsUploading(false);
			setIsUploaded(true);
		} catch (error) {
			console.error("Error uploading file:", error);
			setIsUploading(false);
		}
	};

	const handleDegreeOfRedactionChange = (value: string) => {
		setSelectedRedactionLevel(value);
	};

	const handleSliderChange = (newValue: number[]) => {
		setSliderValue(newValue[0]);
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

			<div className="w-9/12 h-full bg-white my-0 mx-0 flex items-center justify-center">
				<div className="w-full max-w-md mx-auto space-y-4">
					<div className="space-y-2">
						<Label htmlFor="file-upload">Choose a file</Label>
						<div className="flex items-center space-x-2">
							<Input
								id="file-upload"
								type="file"
								className="hidden"
								onChange={handleFileChange}
							/>
							<Button
								onClick={() => document.getElementById("file-upload")?.click()}
								variant="outline"
							>
								Select File
							</Button>
							<span className="text-sm text-gray-500">
								{file ? file.name : "No file selected"}
							</span>
						</div>
					</div>
					<Button
						onClick={handleUpload}
						disabled={!file || isUploading || isUploaded}
						className="w-full"
					>
						{isUploading ? (
							<>
								<Upload className="mr-2 h-4 w-4 animate-spin" />
								Uploading...
							</>
						) : isUploaded ? (
							<>
								<CheckCircle2 className="mr-2 h-4 w-4" />
								Uploaded
							</>
						) : (
							<>
								<File className="mr-2 h-4 w-4" />
								Upload
							</>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
