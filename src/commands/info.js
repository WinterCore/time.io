import { read } from "../store";
import * as Log from "../log";

import Parser from "./parser";

export default async function info(project, args) {
	if (!project) {
        throw new Error(
            Log.withHighlight(
                "You need to select a project first.\nUse %s to switch to a project.",
                "use <name>"
            )
        );
    }

	const data = await read(project);

    return Parser(data, args, true);
};