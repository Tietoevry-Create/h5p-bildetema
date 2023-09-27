import type { languages } from "../constants/languages";

export type LanguageCode = (typeof languages)[number];

export type LanguageCodeString = `lang_${LanguageCode}`;
