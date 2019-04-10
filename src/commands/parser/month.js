import { table } from "table";
import chalk     from "chalk";

import { MONTHS, DAYS }    from "../../config";
import * as Helpers  from "../../helpers";

import { groupByDay } from "./day";

const groupByMonth = (arr) => {
	const dayGrouped = groupByDay(arr);
	return Object.keys(dayGrouped).reduce((acc, dayString) => {
		const monthDate = new Date(dayString);
		const monthString = `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}-1`;
		if (!acc[monthString]) acc[monthString] = { durations : [], total : 0 };
		acc[monthString].durations.push({ start : monthDate, finish : monthDate, total : dayGrouped[dayString].total });
		acc[monthString].total += dayGrouped[dayString].total;
		return acc;
	}, {});
};


const stringify = ({ groupedData, total }) => {
	let result = "";

    Object.keys(groupedData).forEach((month) => {
        const { durations, total } = groupedData[month];
        const str = table([
            ["Started", "Finished", "Duration"],
            ...durations.map(({ start, finish, total }) => [
				`${DAYS[start.getDay()]} ${start.toLocaleDateString()}`,
				`${DAYS[finish.getDay()]} ${finish.toLocaleDateString()}`,
				Helpers.millisecondsToHis(total)
			]),
            ["", "", Helpers.millisecondsToHis(total)]
        ]);

		const monthDate = new Date(month);
		const heading = `${MONTHS[monthDate.getMonth()]} ${monthDate.toLocaleDateString()}`;

        result += `${chalk.green("\u21D2")} ${chalk.green(heading)}\n${chalk.yellow(str)}\n\n`;
    });

    const totalStr = chalk.green(`Total time spent on this project = ${Helpers.millisecondsToHis(total)}`);

    return `\n${result}${totalStr}`;
};

export { groupByMonth, stringify };

export default function groupByMonths(data) {
	const groupedData = groupByMonth(data);
	return {
		total : Helpers.groupedDataTotal(groupedData),
		groupedData
	};
};