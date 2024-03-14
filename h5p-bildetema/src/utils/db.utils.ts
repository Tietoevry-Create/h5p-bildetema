import { LanguageCode } from "common/types/LanguageCode";
import { NewTranslation } from "common/types/types";
import { toSingleLabel } from "common/utils/word.utils";

export function getLabelFromTranslationRecord(
  langCode: LanguageCode,
  tr: Map<LanguageCode, NewTranslation> | undefined,
): string {
  if (!tr) return "";
  const labels = tr.get(langCode)?.labels;
  if (!labels || labels.length === 0) return "";
  return toSingleLabel(labels);
}
