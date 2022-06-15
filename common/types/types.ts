import { LanguageCode } from "./LanguageCode";

export type InputWord = Record<string, string>;

export type Word = {
  id: string;
  label: string;
  images: string[];
  audio?: string;
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
  image?: Image;
};

export type Image = {
  path: string;
  alt?: string;
  height?: number;
  width?: number;
  copyright?: Copyright;
};

export type Copyright = {
  author?: string;
  license?: string;
  source?: string;
  title?: string;
  version?: string;
  year?: string;
};
