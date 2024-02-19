import { languagesOriginal } from "common/constants/languages";
import { LanguageCode, LanguageCodeString } from "common/types/LanguageCode";
import { Language } from "common/types/types";

export const translatedLabel = (
  language: Language | LanguageCode,
  translations: Record<LanguageCodeString, string>,
): string => {
  if (typeof language === "string") {
    return translations[`lang_${language}`];
  }
  return translations[`lang_${language.code}`];
};

/**
 * Filter out languages that are not in the database or the original list of languages.
 * This is to avoid errors when the database is updated.
 * @param languages - languages to sanitize
 * @param languagesFromDB - languages from the database
 */
export const sanitizeLanguages = (
  languages: Language[],
  languagesFromDB: Language[] | undefined,
): Language[] => {
  return languages.filter(
    language =>
      languagesOriginal?.[language.code] &&
      languagesFromDB?.find(lang => lang.code === language.code),
  );
};
