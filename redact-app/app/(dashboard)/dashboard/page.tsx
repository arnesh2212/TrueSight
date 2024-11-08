"use client";
import { FileUploadDemo } from "@/components/FileUpload";

export default function Home() {
    return (
        <div>
            <div className="flex justify-center items-center h-full bg-gray-400 sticky top-0 w-full">
                <FileUploadDemo>
                </FileUploadDemo>
            </div>
        </div>
    );
}
