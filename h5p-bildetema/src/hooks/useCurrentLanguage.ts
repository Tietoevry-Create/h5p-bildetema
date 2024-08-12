import { useLocation, useSearchParams } from "react-router-dom";
import { attributeLanguages } from "common/constants/languages";
import { LanguageCode, isLanguageCode } from "common/types/LanguageCode";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { Language } from "common/types/types";

export const useCurrentLanguageCode = (): LanguageCode => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const langFromPath: string =
    pathname.split("/").length >= 2 ? pathname.split("/")[1] : "";

  if (isLanguageCode(langFromPath)) {
    return langFromPath;
  }

  const lang = searchParams.get("lang");
  if (lang && isLanguageCode(lang)) {
    return lang;
  }

  // TODO: should not be static
  return "nob";
};

export const useCurrentLanguageAttribute = (): string => {
  const currentLanguageCode = useCurrentLanguageCode();
  return attributeLanguages[currentLanguageCode];
};

export const useCurrentLanguage = (): Language => {
  const { langCodeTolanguages } = useNewDBContext();
  const langCode = useCurrentLanguageCode();
  const language = langCodeTolanguages.get(langCode);
  if (!language) {
    return { code: langCode, label: "Bokmål", rtl: false } as Language;
  }
  return language;
};

// Without react router
export const getCurrentLanguageCode = (): LanguageCode => {
  const pathname = window.location.hash;

  // Extract language code from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const langFromPath = pathSegments.length > 0 ? pathSegments[1] : "";

  if (isLanguageCode(langFromPath)) {
    return langFromPath;
  }

  // Default language code
  return "nob";
};
