import { useTranslation as useTranslationOriginal } from "use-h5p";
import { TranslationKey } from "../types/TranslationKey";

export const useL10n = (translationKey: TranslationKey): string => {
  const { t } = useTranslationOriginal();
  return t(translationKey);
};

export const useL10ns = <TString extends TranslationKey = TranslationKey>(
  ...translationKeys: Array<TString>
): Record<(typeof translationKeys)[number], string> => {
  const { t } = useTranslationOriginal();
  const translations: Record<(typeof translationKeys)[number], string> =
    {} as Record<(typeof translationKeys)[number], string>;

  translationKeys.forEach(translationKey => {
    translations[translationKey] = t(translationKey);
  });
  return translations;
};

export const useTranslation = (): ReturnType<
  typeof useTranslationOriginal<TranslationKey>
> => {
  const original = useTranslationOriginal();

  return {
    ...original,
    t: (key: TranslationKey) => original.t(key),
  };
};
