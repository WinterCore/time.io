import { exists }        from "../store";
import { withHighlight } from "../log";

import Timer    from "../timer";

import TimeIOError from "../timeio-error";

export default async function use(name) {
    try {
        await exists(name);
        Timer.reset();
    } catch (e) {
        throw new TimeIOError(
            withHighlight(
                "The project you're trying to use doesn't exist.\nUse %s to create a new project.",
                "create <name>"
            )
        );
    }
};