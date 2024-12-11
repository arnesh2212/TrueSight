import { Textarea } from "@/components/ui/textarea";

export default function Home() {
	return (
		<div className="flex">
			<div className="h-full w-full">
				<textarea name="input" id="input" className="w-full h-full p-2" />
			</div>
			<div className="h-full w-full">
				<textarea name="output" id="output" className="w-full h-full p-2" />
			</div>
		</div>
	);
}
