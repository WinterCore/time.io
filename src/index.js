if (process.env.ENVIRONMENT === "development") {
    require("source-map-support").install();
}

import fs               from "fs-extra";
import commandReader    from "./commands";
import { dataPath }     from "./config";
import { printWelcome } from "./log";

printWelcome();

fs.ensureDir(dataPath)
    .then(() => {
        commandReader();
    }).catch(console.log);