import {Response} from "express";
import {join} from "path";

const ROOT_DIR = process.cwd();

const path500 = join(ROOT_DIR, "public/errors/500.html");
const path404 = join(ROOT_DIR, "public/errors/404.html");

export function send500(res: Response): void {
    res.status(500).sendFile(path500);
}

export function send404(res: Response): void {
    res.status(404).sendFile(path404);
}