import { MONTHS }    from "../../config";
import * as Helpers  from "../../helpers";

export default function groupByMonths(data) {
	let groupedData      = {};
	let currentGroup     = null;
	let currentMonthDate = null;
    let currentDayDate   = null;

	let grandTotal = 0;

    let dayTotal = 0;

	data.forEach((duration, i) => {
		const { start, finish } = duration;
		const startDate         = new Date(start);
		const finishDate        = new Date(finish);

		if (currentMonthDate === null || !Helpers.areMonthsEqual(currentMonthDate, startDate)) {
            // Calculate the total for the previous month on the second iteration
			if (currentMonthDate !== null) currentGroup.total = Helpers.secondsToHis(currentGroup.total);
			currentMonthDate = new Date(duration.start);
			currentGroup = {
				durations : [],
				total     : 0
			};
			const dateString = `${MONTHS[currentMonthDate.getMonth()]} ${currentMonthDate.getFullYear()}`;
			groupedData[dateString] = currentGroup;
		}

		const difference = Math.round((finish - start) / 1000);

        if (currentDayDate === null || !Helpers.areDaysEqual(currentDayDate, startDate)) {
            if (currentDayDate !== null) 
            currentGroup.durations.push({
                start    : startDate.toLocaleTimeString(),
                finish   : finishDate.toLocaleTimeString(),
                duration : Helpers.secondsToHis(difference)
            });
            currentGroup.total += difference;
            grandTotal         += difference;
        }

	});
	currentGroup.total = Helpers.secondsToHis(currentGroup.total);



    return {
		groups : groupedData,
		total  : Helpers.secondsToHis(grandTotal)
	};
};