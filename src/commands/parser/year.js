import { table } from "table";
import chalk     from "chalk";

import { MONTHS }    from "../../config";
import * as Helpers  from "../../helpers";

import { groupByMonth } from "./month";

const groupByYear = (arr) => {
	const monthGrouped = groupByMonth(arr);
	return Object.keys(monthGrouped).reduce((acc, monthString) => {
		const monthDate = new Date(monthString);
		const yearString = `${monthDate.getFullYear()}-01-01`;
		if (!acc[yearString]) acc[yearString] = { durations : [], total : 0 };
		acc[yearString].durations.push({ start : monthDate, finish : new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0), total : monthGrouped[monthString].total });
		acc[yearString].total += monthGrouped[monthString].total;
		return acc;
	}, {});
};


const stringify = ({ groupedData, total }) => {
	let result = "";

    Object.keys(groupedData).forEach((year) => {
        const { durations, total } = groupedData[year];
        const str = table([
            ["Started", "Finished", "Duration"],
            ...durations.map(({ start, finish, total }) => [
				`${MONTHS[start.getMonth()]} ${start.toLocaleDateString()}`,
				`${MONTHS[finish.getMonth()]} ${finish.toLocaleDateString()}`,
				Helpers.millisecondsToHis(total)
			]),
            ["", "", Helpers.millisecondsToHis(total)]
        ]);

		const yearDate = new Date(year);
		const heading = `${yearDate.getFullYear()}`;

        result += `${chalk.green("\u21D2")} ${chalk.green(heading)}\n${chalk.yellow(str)}\n\n`;
    });

    const totalStr = chalk.green(`Total time spent on this project = ${Helpers.millisecondsToHis(total)}`);

    return `\n${result}${totalStr}`;
};

export { groupByYear, stringify };

export default function groupByYears(data) {
	const groupedData = groupByYear(data);
	return {
		total : Helpers.groupedDataTotal(groupedData),
		groupedData
	};
};