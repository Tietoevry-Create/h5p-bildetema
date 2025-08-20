import { useLocation, useSearchParams } from "react-router-dom";
import { isLanguageCode, LanguageCode } from "common/types/LanguageCode";
import { attributeLanguages } from "../constants/languages";

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
