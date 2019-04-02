import * as Log from "../../log";

import dayParser, { stringify as stringifyDayData }       from "./day";
import monthParser, { stringify as stringifyMonthData }   from "./month";
import yearParser, { stringify as stringifyYearData }     from "./year";
import rangeParser, { stringify as stringifyRangeParser } from "./range";

const types = {
	day   : dayParser,
	month : monthParser,
	year  : yearParser,
	range : rangeParser
};

const stringifiers = {
	day         : stringifyDayData,
	month       : stringifyMonthData,
	yearParser  : stringifyYearData,
	rangeParser : stringifyRangeParser
};

const defaultType = "day";

export {
    types,
    defaultType
};

export default function Parser(data, [type = defaultType, ...args], stringified = false) {
	if (types[type]) {
		const parsedData = types[type](data, ...args);
		if (stringified) return stringifiers[type](parsedData);
		else return parsedData;
	}
	throw new Error(
		Log.withHighlight(
			`Invalid parser type %s, Please use %s for available parser types.`,
			type,
			"help"
		)
	);
};