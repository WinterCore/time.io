import timer    from "../timer";
import * as Log from "../log";

export default async function start(project) {
    if (!project) {
        throw new Error(
            Log.withHighlight(
                "You need to select a project first.\nUse %s to switch to a project.",
                "use <name>"
            )
        );
    }
    timer.currentProject = project;
    timer.start();
};