import path from "path";

export const dataPath = path.resolve(process.env.APPDATA, "..", "local", "time-io");
export const numbers  = [
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

export const colon = "   \n _ \n(_)\n _ \n(_)\n   ";

export const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];