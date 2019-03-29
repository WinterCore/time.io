import fs   from "fs-extra";
import path from "path";

import { dataPath } from "./config";

const dataDir = path.join(dataPath, "projects");

export const read = name =>
	fs.readFile(path.join(dataDir, `${name}.json`), "utf-8")
		.then(res => JSON.parse(res));


export const write = (name, data = []) =>
	fs.writeFile(
		path.join(dataDir, `${name}.json`),
		JSON.stringify(data),
		"utf-8"
	);

export const append = (name, data = []) =>
	read(name)
		.then(res => write(name, res.concat([data])));


export const exists = name =>
	fs.stat(path.join(dataDir, `${name}.json`));

export const remove = name =>
	fs.unlink(path.join(dataDir, `${name}.json`));

export const list = () =>
	fs.readdir(dataDir);