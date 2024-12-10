import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";

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

	const salt = await bcrypt.genSalt(10);
	const hashedFileName = await bcrypt.hash(file.name, salt);

	try {
		const path = `${process.cwd()}/data/input/${hashedFileName}`;
		await writeFile(path, buffer);
		console.log(`File uploaded to ${path}`);

		return NextResponse.json({ success: true, path });
	} catch (error) {
		console.error("Error writing file:", error);
		return NextResponse.json({
			success: false,
			message: "Failed to upload file",
		});
	}
}
