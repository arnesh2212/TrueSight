import { Textarea } from "@/components/ui/textarea";

export default function Home() {
	return (
		<div className="h-full">
			<div className="flex h-full">
				<div className="flex-1 h-full">
					<textarea
						name="input"
						id="input"
						className="w-full h-full p-2 border-r-2 border-gray-200 bg-neutral-50"
					/>
				</div>
				<div className="flex-1 h-full">
					<textarea name="output" id="output" className="w-full h-full p-2" />
				</div>
			</div>
			<div className="w-full">hi</div>
		</div>
	);
}
