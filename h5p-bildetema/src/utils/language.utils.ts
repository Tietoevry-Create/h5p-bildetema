import { Language } from "common/types/types";

export const translatedLabel = (language: Language, languages: any): string => {
  return languages[`lang_${language.code}`];
};
