import * as Log from "../../../log";

import dayParser from "./day";

const types = {
	day   : Symbol("Day"),
	month : Symbol("Month"),
	year  : Symbol("Year"),
	range : Symbol("Range")
};

const defaultType = types.day;

export {
    types,
    defaultType
};

export default function Parser(data, [type = defaultType, from, to]) {
	if (types.day === type) return dayParser(data);
	else if (types.month === type) return monthParser(data);
	else if (types.year === type) return yearParser(data);
	else if (types.range === type) return rangeParser(data, from, to);

	throw new Error(
		Log.withHighlight(
			`Invalid parser type %s, Please use %s for available parser types.`,
			type,
			"help"
		)
	);
};