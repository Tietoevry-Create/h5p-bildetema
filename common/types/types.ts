import { LanguageCode } from "./LanguageCode";
import type { Media } from "h5p-types";

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

export type Image = Media;

export enum TopicGridSizes {
  Big,
  Compact,
}
