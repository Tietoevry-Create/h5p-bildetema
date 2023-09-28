import { LanguageCodeString } from "common/types/LanguageCode";
import { Language } from "common/types/types";

export const translatedLabel = (
  language: Language,
  translations: Record<LanguageCodeString, string>,
): string => {
  return translations[`lang_${language.code}`];
};
