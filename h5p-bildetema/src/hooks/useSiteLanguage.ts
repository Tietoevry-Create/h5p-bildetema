import { Language } from "common/types/types";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { attributeLanguages } from "common/constants/languages";
import { useL10n } from "./useL10n";

export const useSiteLanguageString = (): string => {
  return useL10n("htmlLanguageCode");
};

export const useSiteLanguage = (): Language => {
  const { languages } = useNewDBContext();
  const siteLanguageString = useSiteLanguageString();

  const siteLanguage = languages.find(
    lang =>
      siteLanguageString ===
      (attributeLanguages as Record<string, string>)[lang.code],
  );

  if (!siteLanguage) {
    return { code: "nob", label: "Bokmål", rtl: false } as Language;
  }

  return siteLanguage;
};
