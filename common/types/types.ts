import { Opaque } from "type-fest";

export type InputWord = Record<string, string>;

export type Word = {
  id: string;
  label: string;
  images: string[];
};

export type LanguageCode = Opaque<string, "LanguageCode">;

export const makeLanguageCode = (str: string) => {
  // preform some validation if needed
  return str as LanguageCode;
};

export type Language = {
  label: string;
  code: LanguageCode;
  rtl: boolean;
};

export type Topic = {
  id: string;
  label: string;
  subTopics: Map<string, Topic>;
  words: Map<LanguageCode, Word[]>;
};
