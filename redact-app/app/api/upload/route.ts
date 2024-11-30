import { writeFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { bcrypt } from "bcryptjs";

export async function GET() {
	return NextResponse.json({ success: true });
}
export async function POST(request: NextRequest) {
	const data = await request.formData();
	const file: File | null = data.get("file") as unknown as File;

	const currentPath = process.cwd();
	if (!file) {
		return NextResponse.json({ success: false, currentPath, data });
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const salt = await bcrypt.genSalt(10);
	const hashedFileName = await bcrypt.hash(file.name, salt);

	const path = `${currentPath}/data/input/${hashedFileName}`;
	await writeFile(path, buffer);
	console.log(`open ${path} to see the uploaded file`);

	return NextResponse.json({ success: true, path });
}
