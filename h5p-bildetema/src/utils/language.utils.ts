import { LanguageCodeString } from "common/types/LanguageCode";
import { Language } from "common/types/types";

export const translatedLabel = (
  language: Language,
  languages: Record<LanguageCodeString, string>,
): string => {
  return languages[`lang_${language.code}`];
};
