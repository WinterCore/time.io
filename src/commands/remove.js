import { remove } from "../store";

import TimeIOError from "../timeio-error";

export default async function Delete(name) {
    try {
        await remove(name);
    } catch (e) {
        throw new TimeIOError("The project you're trying to delete doesn't exist.");
    }
};