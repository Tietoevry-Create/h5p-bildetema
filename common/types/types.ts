import { AudioFile } from "./AudioFile";
import { LanguageCode } from "./LanguageCode";

export type InputWord = Record<string, string>;

export type Labels = {
  label: string;
  article?: string;
}[];

interface CommonWord {
  id: string;
  images: ImageUrl[];
  audioFiles?: Array<AudioFile>;
  order?: number;
}

export interface TopicWord extends CommonWord {
  label: string;
  article?: string;
}

export interface Word extends CommonWord {
  labels: Labels;
}

export interface WordSearchResults extends Word {
  topicId?: string;
  subTopicId?: string;
}

export type SearchResult = {
  id: string;
  images: ImageUrl[];
  topicId?: string;
  subTopicId?: string;
  translations: searchResultTranslations[];
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
  labelTranslations: Map<LanguageCode, TopicWord>;
  subTopics: Topic[];
  words: Map<LanguageCode, Word[]>;
  images: ImageUrl[];
  onlyTopicImage: boolean;
};

export type JSONData = {
  topics: JSONTopic[];
  languages: Language[];
  translations: Translations;
};
export type JSONTopic = {
  id: string;
  label: string;
  labelTranslations: Record<string, TopicWord>;
  subTopics: Record<string, JSONTopic>;
  words: Record<string, Word[]>;
  images: ImageUrl[];
  onlyTopicImage?: boolean;
};

export enum TopicGridSizes {
  Big,
  Compact,
}

export enum DisplayView {
  TopicImage,
  Grid,
}

export type TopicIdentifier = {
  topicId: string;
  subTopicId?: string;
};

export type UserData = {
  favoriteLanguages: Language[];
  currentLanguage?: Language;
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
  audioFiles?: Array<AudioFile>;
};

export type searchResultTranslations = {
  langCode: LanguageCode;
  labels: Labels;
  audioFiles?: Array<AudioFile>;
};

export type Translations = Record<LanguageCode, Record<string, Translation>>;
