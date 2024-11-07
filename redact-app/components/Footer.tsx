"use client";

import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function BackgroundBoxesFooter() {
    return (
        <div className="h-96 relative w-full overflow-hidden bg-white flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-slate-200 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            <Boxes />
            <Image src={"Logo1.svg"} width={150} height={150} className="bg-white z-10 px-3"></Image>
        </div>
    );
}
