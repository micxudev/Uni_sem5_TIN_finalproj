import {DbAdapter} from "./db.adapter";
import {sqliteDb} from "./db.sqlite";

export const db: DbAdapter = sqliteDb;