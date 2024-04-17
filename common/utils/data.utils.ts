import SuperJSON from "superjson";
import { getAudioFiles } from "common/utils/audio/audio.utils";
import { getImageUrl } from "common/utils/image/image.utils";
import { LanguageCode } from "../types/LanguageCode";
import {
  Language,
  Topic,
  Word,
  JSONTopic,
  JSONData,
  Data,
  Translations,
  TopicWord,
  NewWord,
  NewData,
  WordId,
  TopicId,
  SearchResultTranslations,
  SearchResult,
} from "../types/types";

const languages: Language[] = [];
const topics: Topic[] = [];
let translations: Translations = {} as Translations;
let backendURL =
  "https://cdn-prod-bildetema.azureedge.net/data/database.json.tar.gz";

const convertJsonToTopicsArray = (jsonTopic: JSONTopic[]): Topic[] => {
  const t: Topic[] = [];
  jsonTopic.forEach(topic => {
    const subTopics: Topic[] = [];
    Object.values(topic.subTopics).forEach(subtopic => {
      const labelTranslations = new Map<LanguageCode, TopicWord>(
        Object.entries(subtopic.labelTranslations) as [
          LanguageCode,
          TopicWord,
        ][],
      );
      const words = new Map<LanguageCode, Word[]>(
        Object.entries(subtopic.words) as [LanguageCode, Word[]][],
      );
      subTopics.push({
        id: subtopic.id,
        label: subtopic.label,
        images: subtopic.images,
        subTopics: [],
        labelTranslations,
        words,
        onlyTopicImage: subtopic?.onlyTopicImage ?? false,
      });
    });
    const labelTranslations = new Map<LanguageCode, TopicWord>(
      Object.entries(topic.labelTranslations) as [LanguageCode, TopicWord][],
    );
    const words = new Map<LanguageCode, Word[]>(
      Object.entries(topic.words) as [LanguageCode, Word[]][],
    );
    t.push(
      (topic.id,
      {
        id: topic.id,
        label: topic.label,
        images: topic.images,
        subTopics,
        labelTranslations,
        words,
        onlyTopicImage: topic?.onlyTopicImage ?? false,
      }),
    );
  });
  return t;
};

const fetchJson = async (): Promise<void> => {
  const data = await fetch(backendURL);

  const jsonData: JSONData = await data.json();
  const jsonTopic: JSONTopic[] = jsonData.topics;

  topics.length = 0;
  languages.length = 0;

  const langs: Language[] = jsonData.languages;
  languages.push(...langs);
  topics.push(...convertJsonToTopicsArray(jsonTopic));
  translations = jsonData.translations;
};

export const getData = async (databaseUrl: string): Promise<Data> => {
  if (databaseUrl !== "") backendURL = databaseUrl;

  if (!topics.length || languages.length) {
    await fetchJson();
  }
  return { topics, languages, translations };
};

export const getNewData = async (databaseUrl: string): Promise<NewData> => {
  if (databaseUrl !== "") backendURL = databaseUrl;
  const res = await fetch(backendURL);
  const text = await res.text();
  const dataObj = SuperJSON.parse(text) as NewData;
  return {
    ...dataObj,
    languages: Array.from(dataObj.langCodeTolanguages.values()),
  } as NewData;
};

export const getNewWordsFromId = (
  id: string,
  idToWords?: Map<string, NewWord>,
  idToContent?: Map<string, string[]>,
): NewWord[] => {
  const content = idToContent?.get(id);
  if (!content) return [];

  return content
    .map(item => idToWords?.get(item))
    .filter((item): item is NewWord => item !== undefined);
};

export const getMainTopics = (
  idToWords?: Map<WordId, NewWord>,
  idToContent?: Map<TopicId, WordId[]>,
): NewWord[] => {
  return getNewWordsFromId("root", idToWords, idToContent);
};

export const newWordsToWords = (
  newWords: NewWord[],
  languageCode: LanguageCode,
  backendUrl: string,
): Word[] =>
  newWords.map(w => {
    const labels = w.translations.get(languageCode)?.labels || [];
    const images = w.images.map(i => getImageUrl(i, backendUrl));
    const audioFiles = getAudioFiles(w.id, backendUrl, languageCode);
    const word: Word = {
      id: w.id,
      labels,
      images,
      audioFiles,
    };
    return word;
  });

export const newWordsIsTopics = (newWords: NewWord[]): boolean => {
  return newWords.some(word => {
    return word.id.charAt(0) === "T";
  });
};

const getTranslations = (
  word: NewWord,
  langs: Language[],
  backendUrl: string,
): SearchResultTranslations[] => {
  return langs.map(lang => {
    const labels = word.translations.get(lang.code)?.labels || [];
    const audioFiles = getAudioFiles(word.id, backendUrl, lang.code);
    const searchResultTranslations: SearchResultTranslations = {
      lang,
      labels,
      audioFiles,
    };
    return searchResultTranslations;
  });
};

export const newWordsToSearchResult = (
  newWords: NewWord[],
  langs: Language[],
  backendUrl: string,
): SearchResult[] => {
  return newWords.map(word => {
    const images = word.images.map(i => getImageUrl(i, backendUrl));
    const t = getTranslations(word, langs, backendUrl);

    const result: SearchResult = {
      id: word.id,
      images,
      translations: t,
      topicId: word.topicId,
      subTopicId: word.subTopicId,
    };
    return result;
  });
};
