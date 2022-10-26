import { useTranslation as generalUseTranslation } from "use-h5p";
import type { TranslationKey } from "../types/TranslationKey";

export const useTranslation = generalUseTranslation<TranslationKey>;
