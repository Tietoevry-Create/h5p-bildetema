import { AudioFile } from "./AudioFile";
import { LanguageCode } from "./LanguageCode";

export type InputWord = Record<string, string>;

export type Word = {
  id: string;
  label: string;
  images: ImageUrl[];
  audioFiles?: Array<AudioFile>;
  article?: string;
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
  subTopics: Topic[];
  words: Map<LanguageCode, Word[]>;
  images: ImageUrl[];
};

export type JSONData = {
  topics: JSONTopic[];
  languages: Language[];
  translations: Translations;
};
export type JSONTopic = {
  id: string;
  label: string;
  labelTranslations: Record<string, Word>;
  subTopics: Record<string, JSONTopic>;
  words: Record<string, Word[]>;
  images: ImageUrl[];
};

export enum TopicGridSizes {
  Big,
  Compact,
}

export type TopicIdentifier = {
  topicId: string;
  subTopicId?: string;
};

export type UserData = {
  currentLanguage: Language;
  favoriteLanguages: Language[];
};

export type TopicIds = {
  topicId?: string;
  subTopicId?: string;
};

export type Data = {
  topics: Topic[];
  languages: Language[];
  translations: Translations;
};

export type Translation = {
  id: string;
  label: string;
  audioFiles: Array<AudioFile>;
};

export type Translations = Record<LanguageCode, Record<string, Translation>>;
