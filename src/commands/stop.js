import Timer from "../timer";

import { append } from "../store";

export default async function stop(project) {
    Timer.stop();
    const duration = Timer.getDuration();

    try {
        await append(project, { start : Timer.startTime, finish : Date.now() });
    } catch (e) {
        console.log(e);
        throw new Error("Something happened while saving to the hard drive.");
    }
}