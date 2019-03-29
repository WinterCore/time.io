import chalk     from "chalk";
import { table } from "table";

import { read } from "../../store";
import * as Log from "../../log";

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

    const { groups, total } = Parser(data, args);

    let result = "";

    Object.keys(groups).forEach((key) => {
        const { durations, total } = groups[key];
        const str = table([
            ["Started", "Finished", "Duration"],
            ...durations.map(({ start, finish, duration }) => [start, finish, duration]),
            ["", "", total]
        ]);

        result += `${chalk.green("\u21D2")} ${chalk.green(key)}\n${chalk.yellow(str)}\n\n`;
    });

    const totalStr = chalk.green(`Total time spent on this project = ${total}`);

    return `\n${result}${totalStr}`;
};