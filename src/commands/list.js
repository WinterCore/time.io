import { list } from "../store";
import * as Log from "../log";

const createList = projects => projects.reduce((str, _) => `${str}\n- ${_.split(".")[0]}`, "");

export default async function List() {
    const projects = await list();
    if (projects.length) return createList(projects);
    throw new Error(
        Log.withHighlight(
            "You have no projects\nUse %s to create a new project.",
            "create <name>"
        )
    );
};