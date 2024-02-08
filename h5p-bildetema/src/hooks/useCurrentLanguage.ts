import { useLocation, useSearchParams } from "react-router-dom";
import { attributeLanguages } from "common/constants/languages";
import { LanguageCode, isLanguageCode } from "common/types/LanguageCode";

export const useCurrentLanguage = (): string => {
  const { pathname } = useLocation();

  const currentLanguageCode: LanguageCode =
    pathname.split("/").length >= 2
      ? (pathname.split("/")[1] as LanguageCode)
      : "nob";

  return attributeLanguages[currentLanguageCode];
};

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

  return "nob";
};
