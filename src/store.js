import fs   from "fs-extra";
import path from "path";

import { PROJECTS_PATH } from "./config";


export const read = name =>
	fs.readFile(path.join(PROJECTS_PATH, `${name}.json`), "utf-8")
		.then(res => JSON.parse(res));


export const write = (name, data = []) =>
	fs.writeFile(
		path.join(PROJECTS_PATH, `${name}.json`),
		JSON.stringify(data),
		"utf-8"
	);


export const append = (name, data = []) =>
	read(name)
		.then(res => write(name, res.concat([data])));


export const exists = name =>
	fs.stat(path.join(PROJECTS_PATH, `${name}.json`));

export const remove = name =>
	fs.unlink(path.join(PROJECTS_PATH, `${name}.json`));

export const list = () =>
	fs.readdir(PROJECTS_PATH);

	
export const rewrite = (name, data = []) =>
	remove(name)
		.then(() => fs.writeFile(
			path.join(PROJECTS_PATH, `${name}.json`),
			JSON.stringify(data),
		));