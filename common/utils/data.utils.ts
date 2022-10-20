import { LanguageCode } from "../types/LanguageCode";
import {
  Language,
  Topic,
  Word,
  JSONTopic,
  JSONData,
  Data,
  Translations,
} from "../types/types";

const NON_LANGUAGE_FIELDS = [
  "Bane",
  "Bilde_a",
  "Bilde_b",
  "Bilde_c",
  "Elementtype",
  "Tema1",
  "Title",
  "Undertema1",
  "Bokmål_nb_duplisert",
];

const languages: Language[] = [];
const topics: Topic[] = [];
let translations: Translations = {} as Translations;
let backendURL = "https://cdn-prodbildetema.azureedge.net/data/database.json";

export const getData = async (databaseUrl: string): Promise<Data> => {
  if (databaseUrl !== "") backendURL = databaseUrl;

  if (!topics.length || languages.length) {
    await fetchJson();
  }
  return { topics, languages, translations };
};

const convertJsonToTopicsArray = (jsonTopic: JSONTopic[]): Topic[] => {
  const t: Topic[] = [];
  jsonTopic.forEach(topic => {
    const subTopics: Topic[] = [];
    Object.values(topic.subTopics).forEach(subtopic => {
      const labelTranslations = new Map<LanguageCode, Word>(
        Object.entries(subtopic.labelTranslations) as [LanguageCode, Word][],
      );
      const words = new Map<LanguageCode, Word[]>(
        Object.entries(subtopic.words) as [LanguageCode, Word[]][],
      );
      subTopics.push({
        id: subtopic.id,
        label: subtopic.label,
        images: subtopic.images,
        subTopics: [],
        labelTranslations: labelTranslations,
        words: words,
      });
    });
    const labelTranslations = new Map<LanguageCode, Word>(
      Object.entries(topic.labelTranslations) as [LanguageCode, Word][],
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
        subTopics: subTopics,
        labelTranslations: labelTranslations,
        words: words,
      }),
    );
  });
  return t;
};

const fetchJson = async () => {
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
