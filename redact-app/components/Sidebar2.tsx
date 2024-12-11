import { Button } from "./ui/button";

const Sidebar = () => {
	return (
		<div className="w-1/6 h-full bg-white my-0 mx-0 flex flex-col justify-between p-4 border-r-2 border-gray-200">
			<div>
				<div className="font-bold text-xl">Properties</div>
				<div className="font-light text-sm">Select from the options</div>

				<div className="justify-between mt-3">
					<div className="text-lg">Degree of Redaction</div>
				</div>
			</div>
			<Button
				className="w-full text-lg bg-sky-950 hover:bg-sky-900"
				size={"lg"}
			>
				Redact
			</Button>
		</div>
	);
};

export default Sidebar;
