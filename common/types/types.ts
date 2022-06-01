import { LanguageCode } from "./LanguageCode";

export type InputWord = Record<string, string>;

export type Word = {
  id: string;
  label: string;
  images: string[];
};

export type Language = {
  label: string;
  code: LanguageCode;
  rtl: boolean;
  isFavorite: boolean;
};

export type Topic = {
  id: string;
  label: string;
  subTopics: Map<string, Topic>;
  words: Map<LanguageCode, Word[]>;
};
