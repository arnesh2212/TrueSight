import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"

export function Navbar() {
    return (
        <div className="flex py-3 w-full bg-white items-center justify-between">
            <div className="pl-10 pr-20 flex cursor-pointer left-0 sticky z-50">
                <Image src={'Logo1.svg'} width={150} height={40} alt="REDACT-Logo" />
            </div>

            <div className="flex-1 flex justify-center">
                <Tabs defaultValue="Text" className="">
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
