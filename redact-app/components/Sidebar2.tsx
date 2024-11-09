import { Button } from "./ui/button";

const Sidebar = () => {
    return (
        <div className="w-1/6 h-5/6 bg-white my-4 mx-4 rounded-xl flex flex-col justify-between p-4">
            <div>hi</div>

            <Button className="w-full text-lg bg-sky-950 hover:bg-sky-900" size={"lg"}>
                Redact
            </Button>
        </div>
    );
}

export default Sidebar;
