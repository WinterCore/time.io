import * as Log from "../log";

import create from "./create";
import remove from "./remove";
import list   from "./list";
import use    from "./use";
import start  from "./start";
import stop   from "./stop";
import info   from "./info";


import timer  from "../timer";


let selectedProject = null;

async function director(str) {
    const cmd     = str.trim().toLowerCase().split(" ");
    const command = cmd[0].toLowerCase();
    const args    = cmd.slice(1);

    // Check if the timer is running and stop it
    if (timer.isRunning) {
        Log.purge();
        await stop(selectedProject);
        Log.printWelcome();
        return;
    }


    switch (command.trim()) {
        case "help":
        case "h":
            Log.printHelp();
            Log.enterCommand();
            break;
        case "clear":
        case "cl":
            Log.purge();
            Log.enterCommandNewLine();
            break;
        case "create":
        case "cr":
            await create(args);
            Log.success();
            Log.enterCommand();
            break;
        case "delete":
        case "remove":
        case "rm":
        case "del":
            await remove(args);
            Log.success();
            Log.enterCommand();
            break;
        case "list":
        case "ls":
        case "l":
            const projects = await list();
            Log.success(projects);
            Log.enterCommand();
            break;
        case "info":
        case "i":
            const data = await info(selectedProject, args);
            Log.success(data);
            Log.enterCommand();
            break;
        case "use":
        case "u":
            await use(args);
            selectedProject = args[0];
            Log.success();
            Log.enterCommand();
            break;
        case "start":
        case "s":
            await start(selectedProject);
            break;
        default:
            Log.error(Log.withHighlight("The command you entered doesn't exist.\nUse %s to list available commands.", "help"));
            Log.enterCommandNewLine();
            break;
    }
}

export default function commandReader() {
	process.stdin.on("data", str => {
        director(str.toString())
            .catch(err => {
                Log.error(err.message)
                Log.enterCommand();
            });
    });
};

