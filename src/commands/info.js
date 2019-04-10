import { read } from "../store";
import * as Log from "../log";

import Parser from "./parser";

import TimeIOError from "../timeio-error";

export default async function info(project, args) {
	if (!project) {
        throw new TimeIOError(
            Log.withHighlight(
                "You need to select a project first.\nUse %s to switch to a project.",
                "use <name>"
            )
        );
    }

	const data = await read(project);

    return Parser(data, args, true);
};