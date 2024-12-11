import { NextApiRequest, NextApiResponse } from "next";

export const revalidate = 3600; // Revalidate every hour (in seconds)

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	return res.status(200).json({ message: "Hello from the API!" });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	const filePath = req.body.filePath;
	console.log("File path received:", filePath);

	// You can handle the file path here
	// For example, you might want to save it to a database or process it further

	return res
		.status(200)
		.json({ message: "File path received successfully", filePath });
}
