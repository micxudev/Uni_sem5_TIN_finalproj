import {DbAdapter} from "@db/db.adapter";
import {sqliteDb} from "@db/db.sqlite";

export const db: DbAdapter = sqliteDb;