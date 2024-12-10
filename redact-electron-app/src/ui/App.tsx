import "./App.css";
import { Button } from "@/components/ui/button";
import React from "react";

const App = () => {
	const [message, setMessage] = React.useState<string | null>(null);
	const handleClick = async () => {
		try {
			const res = await fetch("http://localhost:8000");
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await res.json();
			setMessage(data.message || "Data fetched successfully!");
		} catch (error) {
			console.error("There was a problem with the fetch operation:", error);
			setMessage("Failed to fetch data.");
		}
	};

	return (
		<div className="App">
			<Button onClick={handleClick}>Hi i am a button</Button>
			{message && <p>{message}</p>}
		</div>
	);
};

export default App;
