import { remove } from "../store";

export default async function Delete(name) {
    try {
        await remove(name);
    } catch (e) {
        throw new Error("The project you're trying to delete doesn't exist.");
    }
};