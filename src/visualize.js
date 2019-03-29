import chalk  from "chalk";
import * as R from "ramda";

import { numbers, colon }       from "./config";
import { withHighlight, purge } from "./log";


export const centerX = (str, columns = process.stdout.columns) => {
	const paddingSize = Math.floor((columns - str.length) / 2);
	const padding     = " ".repeat(paddingSize);
	return `${padding}${str}${padding}`;
};

const replaceCharactersWithAsciiArt = _ => (_ === ":" ? colon : numbers[+_]);
const HEIGHT = 6;

const paddingY = height => Math.floor((process.stdout.rows - height) / 2);

function distrubuteLines(letters) {
	const lines = R.range(0, HEIGHT).map(() => "");
	for (let i = 0; i < HEIGHT; i += 1)
        for (let j = 0; j < letters.length; j += 1) lines[i] += `${letters[j][i]} `;
	return lines;
}

const convertToLines = R.compose(distrubuteLines, R.map(R.split("\n")));

const getAsciiChars = R.compose(convertToLines, R.map(replaceCharactersWithAsciiArt), R.split(""));

const printCentered = R.compose(R.map(R.compose(console.log, chalk.green, centerX)), getAsciiChars);

export default function visualize(time) {
	purge();

	const paddingTop    = paddingY(HEIGHT);
	const paddingBottom = paddingTop - 1;

	process.stdout.write("\n".repeat(paddingTop));

	printCentered(time.toString());

	process.stdout.write("\n".repeat(paddingBottom));
	process.stdout.write(withHighlight("Press the %s key to pause.", "enter"));
}