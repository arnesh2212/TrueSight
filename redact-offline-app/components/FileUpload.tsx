"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, CheckCircle2 } from "lucide-react";

export function FileUpload() {
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
			formData.append("filePath", file.name); // Use file.name instead of file.path

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

	return (
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
	);
}
