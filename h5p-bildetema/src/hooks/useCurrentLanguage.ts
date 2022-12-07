import { useLocation } from "react-router-dom";
import { attributeLanguages } from "../../../common/constants/languages";
import { LanguageCode } from "../../../common/types/LanguageCode";

export const useCurrentLanguage = (): string => {
  const { pathname } = useLocation();

  const currentLanguageCode: LanguageCode =
    pathname.split("/").length >= 2
      ? (pathname.split("/")[1] as LanguageCode)
      : "nob";

  return attributeLanguages[currentLanguageCode];
};
