import { useL10n } from "./useL10n";

export const useSiteLanguage = (): string => {
  return useL10n("htmlLanguageCode");
};
