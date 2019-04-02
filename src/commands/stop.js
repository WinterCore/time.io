import timer from "../timer";

export default async function stop(project) {
    try {
        await timer.stop();
    } catch (e) {
        console.log(e);
        throw new Error("Something happened while saving to the hard drive.");
    }
}