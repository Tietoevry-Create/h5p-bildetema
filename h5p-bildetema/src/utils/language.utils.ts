import { languagesOriginal } from "common/constants/languages";
import { LanguageCodeString } from "common/types/LanguageCode";
import { Language } from "common/types/types";

export const translatedLabel = (
  language: Language,
  translations: Record<LanguageCodeString, string>,
): string => {
  return translations[`lang_${language.code}`];
};

/**
 * Filter out languages that are not in the database.
 * This is to avoid errors when the database is updated.
 * @param languages - languages to sanitize
 * @param languagesFromDB - languages from the database
 */
export const sanitizeLanguages = (
  languages: Language[],
  languagesFromDB: Language[] | undefined,
): Language[] => {
  return languages
    .filter(language => languagesOriginal?.[language.code])
    .filter(
      language => languagesFromDB?.find(lang => lang.code === language.code),
    );
};
