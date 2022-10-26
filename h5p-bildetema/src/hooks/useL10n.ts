import { useLocalization, useLocalizations } from "use-h5p";
import { TranslationKey } from "../types/TranslationKey";

export const useL10n = useLocalization<TranslationKey>;
export const useL10ns = useLocalizations<TranslationKey>;
