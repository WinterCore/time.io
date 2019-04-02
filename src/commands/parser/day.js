import * as R    from "ramda";
import chalk     from "chalk";
import { table } from "table";

import { DAYS }     from "../../config";
import * as Helpers from "../../helpers";

const groupByDay = arr => R.reduce((acc, { start, finish }) => {
	const startDate  = new Date(start);
	const finishDate = new Date(finish);
	const dateString = startDate.toLocaleDateString();

	if (!acc[dateString]) acc[dateString] = { durations : [], total : 0 };
	acc[dateString].durations.push({ start : startDate, finish : finishDate, total : finish - start });
	acc[dateString].total += finish - start;
	return acc;
}, {}, arr);

const stringify = ({ groupedData, total }) => {
	let result = "";

    Object.keys(groupedData).forEach((day) => {
        const { durations, total } = groupedData[day];
        const str = table([
            ["Started", "Finished", "Duration"],
            ...durations.map(({ start, finish, total }) => [
				start.toLocaleTimeString(),
				finish.toLocaleTimeString(),
				Helpers.millisecondsToHis(total)
			]),
            ["", "", Helpers.millisecondsToHis(total)]
        ]);

		const dayDate = new Date(day);
		const heading = `${DAYS[dayDate.getDay()]} ${dayDate.toLocaleDateString()}`;

        result += `${chalk.green("\u21D2")} ${chalk.green(heading)}\n${chalk.yellow(str)}\n\n`;
    });

    const totalStr = chalk.green(`Total time spent on this project = ${Helpers.millisecondsToHis(total)}`);

    return `\n${result}${totalStr}`;
};

export { groupByDay, stringify };

export default function groupByDays(data) {
	const groupedData = groupByDay(data);
	return {
		total : Helpers.groupedDataTotal(groupedData),
		groupedData
	};
};