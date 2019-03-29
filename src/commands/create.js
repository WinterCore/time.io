import { write, exists } from "../store";

import { withHighlight } from "../log";

export default async function create(name) {
    if (/[^a-z0-9]/i.test(name)) {
        const err = new Error("Please enter a valid name (only letters and numbers are allowed)...");
        throw err;
    }
    // check if the project already exists.
    let err = null;

    try {
        await exists(name);
        err = new Error(withHighlight("Project already exists.\nUse %s to switch to the existing project.", `use ${name}`));
    } catch(e) {}
    if (err) throw err;

    
    await write(name);
};