import { NextRequest, NextResponse } from "next/server";

// Labels to be used for redaction
// These labels are used to identify the type of data to be redacted
const labels = [
	"person name",
	"phone number",
	"email",
	"date",
	"time",
	"company",
	"ip",
	"pincode",
	"address",
	"city",
	"state",
	"gender",
	"password",
	"credit card",
	"username",
	"url",
	"firstname",
	"lastname",
	"country",
];

const degree = "full";

export async function POST(request: NextRequest) {
	const { text } = await request.json();

	if (!text) {
		return new NextResponse("Input text is required", { status: 400 });
	}

	try {
		const response = await fetch("http://localhost:2212/text", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text, labels, degree }),
		});

		if (!response.ok) {
			throw new Error(`Error processing input: ${response.statusText}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error in route:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
