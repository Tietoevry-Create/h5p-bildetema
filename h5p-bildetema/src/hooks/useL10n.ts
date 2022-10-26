import { useLocalization, useLocalizations } from "use-h5p";
import { TranslationKey } from "../types/TranslationKey";

export const useL10n: typeof useLocalization<TranslationKey> = useLocalization;
export const useL10ns: typeof useLocalizations<TranslationKey> =
  useLocalizations;
