import { useNewDBContext } from "common/hooks/useNewDBContext";
import { useL10ns } from "use-h5p";
import { languages as languagesConst } from "common/constants/languages";
import { LanguageCodeString } from "common/types/LanguageCode";
import { Language } from "common/types/types";
import { translatedLabel } from "../utils/language.utils";

export const useLanguagesWithTranslatedLabels = (): Language[] => {
  const { languages } = useNewDBContext();
  const translations = useL10ns(
    ...(languagesConst.map(
      lang => `lang_${lang}`,
    ) as Array<LanguageCodeString>),
  );
  const languagesWithTranslatedLabels: Language[] = languages
    .map(lang => {
      const label = translatedLabel(lang.code, translations);
      return {
        ...lang,
        label,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
  return languagesWithTranslatedLabels;
};
