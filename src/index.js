if (process.env.ENVIRONMENT === "development") {
    require("source-map-support").install();
}

import fs               from "fs-extra";
import commandReader    from "./commands";
import { PROJECTS_PATH }    from "./config";
import { printWelcome } from "./log";

printWelcome();

fs.ensureDir(PROJECTS_PATH)
    .then(() => {
        commandReader();
    }).catch(console.log);