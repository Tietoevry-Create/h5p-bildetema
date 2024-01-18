import { languages } from "../constants/languages";

export type LanguageCode = (typeof languages)[number];

export function isLanguageCode(value: string): value is LanguageCode {
  return languages.includes(value as LanguageCode);
}

export type LanguageCodeString = `lang_${LanguageCode}`;
