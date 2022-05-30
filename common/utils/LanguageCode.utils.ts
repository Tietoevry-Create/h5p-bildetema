import { LanguageCode } from "../types/LanguageCode";

export const makeLanguageCode = (str: string) => {
  // TODO: Validate that `str` is `ISO-639-x` compliant
  return str as LanguageCode;
};
