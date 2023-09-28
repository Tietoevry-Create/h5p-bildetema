import { useTranslation } from "use-h5p";
import { TranslationKey } from "../types/TranslationKey";

export const useL10n = (translationKey: TranslationKey): string => {
  const { t } = useTranslation();
  return t(translationKey);
};
