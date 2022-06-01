import * as xlsx from "xlsx";
import { InputWord, Word, Topic, Language } from "../types/types";
import { makeLanguageCode } from "../utils/LanguageCode.utils";

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

const databaseURL =
  "https://devaudiobildetema.blob.core.windows.net/database/database.xlsx";

const languages: Language[] = [];
const topics: Topic[] = [];

export const getLanguages = async (): Promise<Language[]> => {
  return languages;
};

export const getLanguage = async (
  languageCode: string,
): Promise<Language | undefined> => {
  return languages.find(item => item.code === languageCode);
};

export const getTopics = async (): Promise<Topic[]> => {
  return topics;
};
const setTopic = (topic: Topic, map: Map<string, Topic>) => {
  map.set(topic.label, topic);
  languages.forEach(language => {
    topic.words.set(language.code, []);
  });
};

const findSubTopics = (
  inputWords: InputWord[],
  topicMap: Map<string, Topic>,
): void => {
  inputWords.forEach((inputWord: InputWord) => {
    const isSubTopic =
      inputWord.Title.includes("T") &&
      inputWord.Bokmål_nb.toLocaleLowerCase() !==
        inputWord.Tema1.toLocaleLowerCase();
    if (!isSubTopic) return;
    const topic: Topic = {
      id: inputWord.Title,
      label: inputWord.Bokmål_nb,
      subTopics: new Map(),
      words: new Map(),
    };
    setTopic(topic, topicMap.get(inputWord.Tema1)!.subTopics);
  });
};

const findMainTopics = (
  inputWords: InputWord[],
  topicMap: Map<string, Topic>,
): void => {
  inputWords.forEach((inputWord: InputWord) => {
    const isMainTopic =
      inputWord.Title.includes("T") &&
      inputWord.Bokmål_nb.toLocaleLowerCase() ===
        inputWord.Tema1.toLocaleLowerCase();
    if (!isMainTopic) return;

    if (!topicMap.has(inputWord.Tema1)) {
      const topic: Topic = {
        id: inputWord.Title,
        label: inputWord.Tema1,
        subTopics: new Map(),
        words: new Map(),
      };
      setTopic(topic, topicMap);
    }
  });
};

const findTopics = (inputWords: InputWord[], topicMap: Map<string, Topic>) => {
  findMainTopics(inputWords, topicMap);
  findSubTopics(inputWords, topicMap);
};

const findImages = (inputWord: InputWord) =>
  Object.entries(inputWord)
    .filter(([key, imageUrl]) => key.includes("Bilde") && imageUrl !== "")
    .map(([, imageUrl]) => imageUrl);

const fillTopicsWithWords = (
  inputWords: InputWord[],
  topicMap: Map<string, Topic>,
) => {
  inputWords.forEach((inputWord: InputWord) => {
    if (!inputWord.Title.includes("V")) return;
    const images: string[] = findImages(inputWord);

    Object.entries(inputWord).forEach(([key, value]) => {
      if (NON_LANGUAGE_FIELDS.includes(key)) return;
      const [_, strLanguageCode] = key.split("_");
      const languageCode = makeLanguageCode(strLanguageCode);
      const word: Word = {
        id: inputWord.Title,
        label: value,
        images: images,
      };
      const wordInMainTopic = inputWord.Undertema1 !== inputWord.Tema1;
      if (wordInMainTopic) {
        topicMap
          .get(inputWord.Tema1)
          ?.subTopics.get(inputWord.Undertema1)
          ?.words.get(languageCode)
          ?.push(word);
        return;
      }
      topicMap.get(inputWord.Tema1)?.words.get(languageCode)?.push(word);
    });
  });
};

const fixTopicMapKeys = (topic: Topic) => {
  const topicMap = new Map<string, Topic>();
  topic.subTopics.forEach(subTopic => {
    topicMap.set(subTopic.id, subTopic);
  });
  return topicMap;
};

const addTopicsToArray = (topicMap: Map<string, Topic>) => {
  topicMap.forEach(topic => {
    topic.subTopics = fixTopicMapKeys(topic);
    topics.push(topic);
  });
};

const addLanguagesToArray = (input: InputWord) => {
  Object.keys(input).forEach(language => {
    if (!NON_LANGUAGE_FIELDS.includes(language)) {
      const [languageName, strLanguageCode, rtl] = language.split("_");
      const languageCode = makeLanguageCode(strLanguageCode);
      languages.push({
        label: languageName,
        code: languageCode,
        rtl: rtl !== undefined,
        isFavorite: false,
      });
    }
  });
};

const parseData = (data: ArrayBuffer): void => {
  languages.length = 0;
  topics.length = 0;

  const workbook = xlsx.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const inputWords = xlsx.utils.sheet_to_json<InputWord>(worksheet, {
    blankrows: true,
    defval: "",
  });

  const topicMap = new Map<string, Topic>();

  addLanguagesToArray(inputWords[0]);

  findTopics(inputWords, topicMap);

  fillTopicsWithWords(inputWords, topicMap);

  addTopicsToArray(topicMap);
};

export const fetchData = async (): Promise<void> => {
  const res = await fetch(databaseURL);
  const arrBuffer = await res.arrayBuffer();
  parseData(arrBuffer);
};
