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

export const getNewWordsFromId = (
  id: string,
  idToWords?: Map<string, NewWord>,
  idToContent?: Map<string, string[]>,
): NewWord[] => {
  const content = idToContent?.get(id);
  if (!content) return []

  return content
    .map(item => idToWords?.get(item))
    .filter((item): item is NewWord => item !== undefined);
}