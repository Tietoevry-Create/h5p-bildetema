import * as xlsx from "xlsx";
import { InputWord, Word, Topic, Language, LanguageCode } from "../../../types";

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

const parseData = (data: ArrayBuffer): void => {
  languages.length = 0;
  topics.length = 0;

  const workbook = xlsx.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json = xlsx.utils.sheet_to_json<InputWord>(worksheet, {
    blankrows: true,
    defval: "",
  });

  // find languages
  Object.keys(json[0]).forEach(language => {
    if (!NON_LANGUAGE_FIELDS.includes(language)) {
      const [languageName, languageCode, rtl] = language.split("_");
      languages.push({
        label: languageName,
        code: languageCode,
        rtl: rtl !== undefined,
      });
    }
  });

  const topicMap = new Map<string, Topic>();
  const setTopic = (topic: Topic, map: Map<LanguageCode, Topic>) => {
    map.set(topic.label, topic);
    languages.forEach(language => {
      topic.words.set(language.code, []);
    });
  };

  // find topics
  json.forEach((element: InputWord) => {
    if (!element.Title.includes("T")) return;

    // add main topic
    if (!topicMap.has(element.Tema1)) {
      const topic: Topic = {
        id: element.Title,
        label: element.Tema1,
        subTopics: new Map(),
        words: new Map(),
      };
      setTopic(topic, topicMap);
      return;
    }

    // add subtopic
    const topic: Topic = {
      id: element.Title,
      label: element.Bokmål_nb,
      subTopics: new Map(),
      words: new Map(),
    };
    setTopic(
      topic,
      topicMap.get(element.Tema1)?.subTopics as Map<string, Topic>,
    );
  });

  // fill words into topics
  json.forEach((element: InputWord) => {
    if (!element.Title.includes("V")) return;
    let images: string[] = [];
    // find images for the word
    Object.entries(element).forEach(([key, value]) => {
      if (key.includes("Bilde")) {
        images.push(value);
        return;
      }
      return;
    });
  
    Object.entries(element).forEach(([key, value]) => {
      if (NON_LANGUAGE_FIELDS.includes(key)) return;
      const [_, languageCode] = key.split("_");
      const word: Word = {
        id: element.Title,
        label: value,
        images: images,
      };
      if (element.Undertema1 !== "") {
        topicMap
          .get(element.Tema1)
          ?.subTopics.get(element.Undertema1)
          ?.words.get(languageCode)
          ?.push(word);
        return;
      }
    });
  });

  // add topics to array and fix subtopic keys
  topicMap.forEach(topic => {
    const subTopics = new Map<string, Topic>();
    topic.subTopics.forEach(element => {
      subTopics.set(element.id, element);
    });
    topic.subTopics = subTopics;
    topics.push(topic)
  });
};

export const fetchData = async (): Promise<void> => {
  const res = await fetch(databaseURL);
  const arrBuffer = await res.arrayBuffer();
  parseData(arrBuffer);
  console.log(topics)
};
