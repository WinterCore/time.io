import chalk    from "chalk";
import ReadLine from "readline";

const { log } = console;

export const success = (str) => {
	log();
	log(chalk.green("Success"));
	if (str) log(str);
	log();
};

export const error = (str) => {
	log();
	log(chalk.red("Error"));
	log(str);
	log();
};

export const withHighlight = (str, ...args) => {
	let i = -1;
	return str.replace(/%s/g, () => {
		i += 1;
		return chalk.yellow(args[i]);
	});
};

export const printOnTheSameLine = (str) => {
	ReadLine.clearLine(process.stdout);
	ReadLine.cursorTo(process.stdout, 0);
	process.stdout.write(str);
};

// export const noProjectsError = withHighlight("You have no projects\nUse %s to create a new project.", "create <name>");

// export const nonExistentProject = withHighlight("The project you're trying to use doesn't exist.\nUse %s to create a new project.", "create <name>");

export const purge = () => process.stdout.write("\x1b[2J");

export const printHelp = () => {
	log();
	log(chalk.cyan("create <name>\t\tCreates a new project with the specified name."));
	log(chalk.cyan("delete <name>\t\tDeletes a project matching the specified name."));
	log(chalk.cyan("list <name>\t\tLists All projects."));
	log(chalk.cyan("use <name>\t\tSwitches to a project with the specified name."));
	log(chalk.cyan("info <formatter>\tPrints data about the currently selected project, See formatter types below."));
	log(chalk.cyan("start\t\t\tStars the timer on the currently selected project."));
	log(chalk.cyan("clear\t\t\tClears the terminal screen."));
	log();
	log(chalk.yellow("Formatter types"));
	log(withHighlight("\t%s Outputs time data grouped by days", "day"));
	log(withHighlight("\t%s Outputs time data groupe by months", "month"));
	log(withHighlight("\t%s Outputs time data grouped dby years", "year"));
	log();
};

export const enterCommand = () => process.stdout.write(`${chalk.green(">")} `);
export const enterCommandNewLine = () => {
	log();
	enterCommand();
};


export const printWelcome = () => {
	purge();
	log(chalk.cyan("  _______ _                _____ ____  "));
	log(chalk.cyan(" |__   __(_)              |_   _/ __ \\ "));
	log(chalk.cyan("    | |   _ _ __ ___   ___  | || |  | |"));
	log(chalk.cyan("    | |  | | '_ ` _ \\ / _ \\ | || |  | |"));
	log(chalk.cyan("    | |  | | | | | | |  __/_| || |__| |"));
	log(chalk.cyan("    |_|  |_|_| |_| |_|\\___|_____\\____/ "));
	log();
	log(`Use ${chalk.yellow("help")} to list available commands`);
	log();
	enterCommand();
};
