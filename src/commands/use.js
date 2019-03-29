import { exists }        from "../store";
import { withHighlight } from "../log";

export default async function use(name) {
    try {
        await exists(name);
    } catch (e) {
        throw new Error(
            withHighlight(
                "The project you're trying to use doesn't exist.\nUse %s to create a new project.",
                "create <name>"
            )
        );
    }
};