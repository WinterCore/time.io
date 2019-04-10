import timer from "../timer";

import TimeIOError from "../timeio-error";

export default async function stop(project) {
    try {
        await timer.stop();
    } catch (e) {
        throw new TimeIOError("Something happened while saving to the hard drive.");
    }
}