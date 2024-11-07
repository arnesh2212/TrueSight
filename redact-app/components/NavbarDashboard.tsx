import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"

export function Navbar() {
    return (
        <div className="relative flex py-3 w-full bg-white items-center">
            {/* Logo Section */}
            <div className="pl-10 pr-20 cursor-pointer">
                <Image src={'Logo1.svg'} width={150} height={40} alt="REDACT-Logo" />
            </div>

            {/* Tabs Section centered absolutely */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Tabs defaultValue="Text">
                    <TabsList className="grid grid-cols-4">
                        <TabsTrigger value="Text">Text</TabsTrigger>
                        <TabsTrigger value="Document">Document</TabsTrigger>
                        <TabsTrigger value="Image">Image</TabsTrigger>
                        <TabsTrigger value="Video">Video</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    )
}
