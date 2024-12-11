import { type NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

// Utility to ensure a directory exists
async function ensureDirectory(dirPath: string) {
	try {
		await access(dirPath, constants.F_OK);
	} catch {
		await mkdir(dirPath, { recursive: true });
	}
}

export async function GET() {
	return NextResponse.json({ success: true, message: "API is running" });
}

export async function POST(request: NextRequest) {
	// Parse form data
	const data = await request.formData();
	const file: File | null = data.get("file") as unknown as File;

	// Validate if file exists
	if (!file) {
		return NextResponse.json({
			success: false,
			message: "No file provided",
		});
	}

	// Validate file type (example: allow only text files and PDFs)
	const allowedTypes = ["text/plain", "application/pdf"];
	if (!allowedTypes.includes(file.type)) {
		return NextResponse.json({
			success: false,
			message: `Invalid file type: ${file.type}. Only text and PDF files are allowed.`,
		});
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	// Generate a unique hashed filename
	const hashedFileName = crypto.randomBytes(16).toString("hex");
	const uploadDir = path.join(process.cwd(), "data/input");

	// Ensure the upload directory exists
	await ensureDirectory(uploadDir);

	// Determine file path
	const fileExtension = file.name.split(".").pop();
	const filePath = path.join(uploadDir, `${hashedFileName}.${fileExtension}`);

	try {
		// Write the file to the filesystem
		await writeFile(filePath, buffer);
		console.log(`File uploaded to ${filePath}`);

		// Simulated redaction process
		const outputText = "Redacted content..."; // Replace with actual logic

		return NextResponse.json({
			success: true,
			message: "File uploaded and processed successfully",
			output: outputText,
			filePath,
		});
	} catch (error) {
		console.error("Error writing file:", error);
		return NextResponse.json({
			success: false,
			message: "Failed to upload or process file",
		});
	}
}
