import { Translation } from "../../../common/types/types";

export function getLabelFromTranslationRecord(
  tr: Record<string, Translation> | undefined,
): string {
  if (tr && tr.F001.label.length > 0) {
    return tr.F001.label;
  }
  return "";
}
