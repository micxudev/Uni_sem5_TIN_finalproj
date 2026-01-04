import * as z from "zod";
import {en, pl} from "zod/locales";
import type {Language} from "./index.ts";

export function setZodLocale(lang: Language) {
    switch (lang) {
        case "en":
            z.config(en());
            break;
        case "pl":
            z.config(pl());
            break;
    }
}