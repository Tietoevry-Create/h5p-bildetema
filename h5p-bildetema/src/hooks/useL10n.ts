import { useTranslation } from "use-h5p";
import { TranslationKey } from "../types/TranslationKey";

export const useL10n = (translationKey: TranslationKey): string => {
  const { t } = useTranslation();
  return t(translationKey);
};

export const useL10ns = <TString extends TranslationKey = TranslationKey>(
  ...translationKeys: Array<TString>
): Record<(typeof translationKeys)[number], string> => {
  const { t } = useTranslation();
  const translations: Record<(typeof translationKeys)[number], string> =
    {} as Record<(typeof translationKeys)[number], string>;

  translationKeys.forEach(translationKey => {
    translations[translationKey] = t(translationKey);
  });
  return translations;
};
