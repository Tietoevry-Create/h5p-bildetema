import { LanguageCode } from "./LanguageCode";

export type InputWord = Record<string, string>;

export type Word = {
  id: string;
  label: string;
  images: ImageUrl[];
  audio?: string;
};

export type ImageUrl = {
  src: string;
  srcSets?: { src: string; width: number }[];
};

export type Language = {
  label: string;
  code: LanguageCode;
  rtl: boolean;
};

export type Topic = {
  id: string;
  label: string;
  labelTranslations: Map<LanguageCode, Word>;
  subTopics: Map<string, Topic>;
  words: Map<LanguageCode, Word[]>;
  images: ImageUrl[];
};

export enum TopicGridSizes {
  Big,
  Compact,
}

export type UserData = {
  currentLanguage: Language;
  favoriteLanguages: Language[];
};

export type TopicIds = {
  topicId?: string;
  subTopicId?: string
}
