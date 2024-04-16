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
  topicId: string;
  subTopicId?: string;
  translations: SearchResultTranslations[];
  order?: number;
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

export type SearchResultTranslations = {
  lang: Language;
  labels: Labels;
  audioFiles?: Array<AudioFile>;
};

export type Translations = Record<LanguageCode, Record<string, Translation>>;

export type NewTranslation = {
  languageCode: LanguageCode;
  labels: {
    label: string;
    article?: string;
  }[];
};

export type NewWord = {
  id: string;
  images: string[];
  translations: Map<LanguageCode, NewTranslation>;
  topicId: string;
  order?: number;
  subTopicId?: string;
};

export type WordId = string;
export type TopicId = string;
export type UrlPath = string;

export type NewData = {
  langCodeTolanguages: Map<LanguageCode, Language>;
  languages: Language[];
  idToWords: Map<WordId, NewWord>;
  idToContent: Map<TopicId, WordId[]>;
  translations: Map<WordId, Map<LanguageCode, NewTranslation>>;
  topicPaths: Map<UrlPath, TopicId>;
};

// TODO: Remove all old / unused types
// TODO: Change "new types" to the old name after the old types are removed

export type CurrentTopics = {
  topic?: NewWord;
  subTopic?: NewWord;
};

export type Collection = {
  title: string;
  wordsIds: string[]
}