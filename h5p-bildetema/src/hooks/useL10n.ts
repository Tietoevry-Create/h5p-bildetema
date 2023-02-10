import { useLocalization, useLocalizations } from "use-h5p";
import { TranslationKey } from "../types/TranslationKey";

export const useL10n = (translationKey: TranslationKey): string => {
  return useLocalization<TranslationKey>(translationKey);
};

export const useL10ns = <TString extends TranslationKey = TranslationKey>(
  ...translationKeys: Array<TString>
): Record<typeof translationKeys[number], string> =>
  useLocalizations<TranslationKey>(...translationKeys);
