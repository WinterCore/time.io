import path from "path";

export const DATA_PATH = path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, "time-io");
export const PROJECTS_PATH = path.join(DATA_PATH, "projects");
export const NUMBERS  = [
	"  ___  \n / _ \\ \n| | | |\n| | | |\n| |_| |\n \\___/ ", // 0
	" __ \n/_ |\n | |\n | |\n | |\n |_|", // 1
	" ___  \n|__ \\ \n   ) |\n  / / \n / /_ \n|____|", // 2
	" ____  \n|___ \\ \n  __) |\n |__ < \n ___) |\n|____/ ", // 3
	" _  _   \n| || |  \n| || |_ \n|__   _|\n   | |  \n   |_|  ", // 4
	" _____ \n| ____|\n| |__  \n|___ \\ \n ___) |\n|____/ ", // 5
	"   __  \n  / /  \n / /_  \n| '_ \\ \n| (_) |\n \\___/ ", // 6
	" ______ \n|____  |\n    / / \n   / /  \n  / /   \n /_/    ", // 7
	"  ___  \n / _ \\ \n| (_) |\n > _ < \n| (_) |\n \\___/ ", // 8
	"  ___  \n / _ \\ \n| (_) |\n \\__, |\n   / / \n  /_/  " // 9
];

export const COLON = "   \n _ \n(_)\n _ \n(_)\n   ";

export const DAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

export const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"December"
];