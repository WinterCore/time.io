import * as Log from "../../log";

import dayParser, { stringify as stringifyDayData }       from "./day";
import monthParser, { stringify as stringifyMonthData }   from "./month";
import yearParser, { stringify as stringifyYearData }     from "./year";
import rangeParser, { stringify as stringifyRangeParser } from "./range";

import TimeIOError from "../../timeio-error";

const types = {
	day   : dayParser,
	month : monthParser,
	year  : yearParser
	// range : rangeParser
};

const stringifiers = {
	day         : stringifyDayData,
	month       : stringifyMonthData,
	year        : stringifyYearData,
	rangeParser : stringifyRangeParser
};

const defaultType = "month";

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
	throw new TimeIOError(
		Log.withHighlight(
			`Invalid formatter type %s, Please use %s for available formatter types.`,
			type,
			"help"
		)
	);
};