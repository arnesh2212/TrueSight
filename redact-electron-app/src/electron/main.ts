import { app, BrowserWindow } from "electron";
import path from "path";

type test = String;

app.on("ready", () => {
	const mainWindow = new BrowserWindow({
		icon: path.join(__dirname, "public", "favicon.ico"),
	});
	mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
});
