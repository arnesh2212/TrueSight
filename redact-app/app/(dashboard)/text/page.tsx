"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { IoInformationCircleOutline } from "react-icons/io5";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

const levels = [
    ["person name", "city", "state", "country"],
    ["person name", "city", "state", "country", "phone number", "email", "pincode", "company"],
    ["person name", "city", "state", "country", "phone number", "email", "pincode", "company", "DOB", "time", "address", "first name", "last name", "gender"],
    ["person name", "city", "state", "country", "phone number", "email", "pincode", "company", "DOB", "time", "address", "first name", "last name", "gender", "password", "credit card", "username", "ip"],
    ["person name", "city", "state", "country", "phone number", "email", "pincode", "company", "DOB", "time", "address", "first name", "last name", "gender", "password", "credit card", "username", "ip", "url", "social security number", "biometric data", "bank account number", "medical record"],
    ["person name", "city", "state", "country", "phone number", "email", "pincode", "company", "DOB", "time", "address", "first name", "last name", "gender", "password", "credit card", "username", "ip", "url", "social security number", "biometric data", "bank account number", "medical record"]
];

export default function Home() {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [sliderValue, setSliderValue] = useState(33);
    const [selectedRedactionLevel, setSelectedRedactionLevel] =
        useState("partial");

    const handleDegreeOfRedactionChange = (value: string) => {
        setSelectedRedactionLevel(value);
    };

    const handleSliderChange = (newValue: number[]) => {
        setSliderValue(newValue[0]);
    };

    const handleRedactText = async () => {
        try {
            // Calculate valid index for levels
            const index = Math.floor(sliderValue / 20); // Clamp to 0–4
            const gradationLevels = levels[index] || []; // Default to empty if out of bounds

            //console.log("Index:", index);
            //console.log("Gradation Levels:", gradationLevels);

            // Prepare JSON payload
            const payload = {
                input: inputText,
                labels: gradationLevels,
                degree: selectedRedactionLevel,
            };

            console.log("Payload:", payload);

            const response = await fetch("http://localhost:2212/text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            console.log("Data:", data);
            setOutputText(data.output);
        } catch (error) {
            console.error("Fetch error:", error);
            setOutputText("Error occurred during redaction");
        }
    };



    return (
        <div className="flex bg-gray-200 h-screen">
            <div className="w-3/12 h-full bg-white my-0 mx-0 flex flex-col justify-between p-4 border-r-2 border-gray-200">
                <div>
                    <div className="font-bold text-xl">Properties</div>
                    <div className="font-light text-sm">Select from the options</div>

                    <div className="justify-between mt-3">
                        <div className="text-lg">Degree of Redaction</div>
                        <div className="my-3">
                            <Select onValueChange={handleDegreeOfRedactionChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select degree" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="full">Full</SelectItem>
                                        <SelectItem value="partial">Partial</SelectItem>
                                        <SelectItem value="synthetic">Synthetic</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="text-lg">Gradation Level</div>
                    <div className="my-3 mb-5">
                        <Slider
                            defaultValue={[sliderValue]}
                            max={100}
                            step={20}
                            onValueChange={handleSliderChange}
                            className=""
                        />
                    </div>
                    <Separator />

                    <div className="justify-between mt-3">
                        <div className="flex items-center">
                            <div className="text-lg mr-2">Demographics</div>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <IoInformationCircleOutline />
                                </HoverCardTrigger>
                                <HoverCardContent className="text-xs">
                                    sfdsfdsfdf
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div className="my-3"></div>
                    </div>
                </div>

                <div>
                    <Button
                        className="w-full text-lg bg-sky-950 hover:bg-sky-900"
                        size={"lg"}
                        onClick={handleRedactText}
                    >
                        Redact
                    </Button>
                    <div className="h-16">-</div>
                </div>
            </div>

            <div className="h-full flex-1 overflow-auto">
                <div className="flex h-full">
                    <div className="flex-1 h-full">
                        <textarea
                            name="input"
                            id="input"
                            className="w-full h-full p-2 border-r-2 border-gray-200 bg-neutral-50 text-xl"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 h-full">
                        <textarea
                            name="output"
                            id="output"
                            className="w-full h-full p-2 text-xl"
                            readOnly
                            value={outputText}
                        />
                    </div>
                </div>
                <div className="w-full">hi</div>
            </div>
        </div>
    );
}
