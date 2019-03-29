import { days }     from "../../../config";
import * as Helpers from "../../../helper";

export default function groupByDays(data) {
    let groupedData    = {};
	let currentGroup   = null;
	let currentDayDate = null;

	let grandTotal = 0;

	data.forEach((duration, i) => {
		const { start, finish } = duration;
		const startDate         = new Date(start);
		const finishDate        = new Date(finish);

		if (currentDayDate === null || !Helpers.areDaysEqual(currentDayDate, startDate)) {
			// convert the total of the previous day to string
			if (currentDayDate !== null) currentGroup.total = Helpers.secondsToHis(currentGroup.total);
			currentDayDate = new Date(duration.start);
			currentGroup = {
				durations : [],
				total     : 0
			};
			const dateString = `${days[currentDayDate.getDay()]} ${currentDayDate.toLocaleDateString()}`;
			groupedData[dateString] = currentGroup;
		}

		const difference = Math.round((finish - start) / 1000);

		currentGroup.durations.push({
			start    : startDate.toLocaleTimeString(),
			finish   : finishDate.toLocaleTimeString(),
			duration : Helpers.secondsToHis(difference)
		});
		currentGroup.total += difference;
		grandTotal         += difference;
	});
	
	// convert the total of the last day to string
	currentGroup.total = Helpers.secondsToHis(currentGroup.total);



    return {
		groups : groupedData,
		total  : Helpers.secondsToHis(grandTotal)
	};
};