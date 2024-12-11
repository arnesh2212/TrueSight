import { redirect } from "next/navigation";

export default function Home() {
	redirect("/text");
	return (
		<div>
			<a href="/text">Redirect to /text</a>
		</div>
	);
}
