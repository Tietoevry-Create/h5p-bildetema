import { useLocalization } from "use-h5p";
import { TranslationKey } from "../types/TranslationKey";

export const useL10n = (translationKey: TranslationKey): string => {
  return useLocalization<TranslationKey>(translationKey);
};
