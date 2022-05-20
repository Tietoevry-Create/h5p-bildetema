import * as xlsx from "xlsx";
import { InputWord, Word, Topic, Language, LanguageCode } from "../types/types";

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
  languageCode: string
): Promise<Language | undefined> => {
  return languages.find((item) => item.code === languageCode);
};

export const getTopics = async (): Promise<Topic[]> => {
  return topics;
};
const setTopic = (topic: Topic, map: Map<LanguageCode, Topic>) => {
  map.set(topic.label, topic);
  languages.forEach((language) => {
    topic.words.set(language.code, []);
  });
};

const findSubTopics = (json: InputWord[], topicMap: Map<string, Topic>): void => {
  json.forEach((element: InputWord) => {
    const isSubTopic =
      element.Title.includes("T") &&
      element.Bokmål_nb.toLocaleLowerCase() !==
        element.Tema1.toLocaleLowerCase();
    if (!isSubTopic) return;
    const topic: Topic = {
      id: element.Title,
      label: element.Bokmål_nb,
      subTopics: new Map(),
      words: new Map(),
    };
    setTopic(topic, topicMap.get(element.Tema1)!.subTopics);
  });
}

const findMainTopics = (json: InputWord[], topicMap: Map<string, Topic>): void => {
  json.forEach((element: InputWord) => {
    const isMainTopic =
      element.Title.includes("T") &&
      element.Bokmål_nb.toLocaleLowerCase() ===
        element.Tema1.toLocaleLowerCase();
    if (!isMainTopic) return;

    if (!topicMap.has(element.Tema1)) {
      const topic: Topic = {
        id: element.Title,
        label: element.Tema1,
        subTopics: new Map(),
        words: new Map(),
      };
      setTopic(topic, topicMap);
    }
  });
}

const findTopics = (json: InputWord[], topicMap: Map<string, Topic>) => {
  findMainTopics(json, topicMap)
  findSubTopics(json, topicMap)
}

const fillTopicsWithWords = (json: InputWord[], topicMap: Map<string, Topic>) => {
  
  json.forEach((element: InputWord) => {
    if (!element.Title.includes("V")) return;
    let images: string[] = [];
    
    const findImages = () => {
      Object.entries(element).forEach(([key, value]) => {
        if (key.includes("Bilde")) {
          images.push(value);
          return;
        }
        return;
      });
    }
    findImages();

    Object.entries(element).forEach(([key, value]) => {
      if (NON_LANGUAGE_FIELDS.includes(key)) return;
      const [_, languageCode] = key.split("_");
      const word: Word = {
        id: element.Title,
        label: value,
        images: images,
      };
      const wordInMainTopic = element.Undertema1 !== element.Tema1
      if (wordInMainTopic) {
        topicMap
          .get(element.Tema1)
          ?.subTopics.get(element.Undertema1)
          ?.words.get(languageCode)
          ?.push(word);
        return;
      }
      topicMap.get(element.Tema1)?.words.get(languageCode)?.push(word);
    });
  });
}

const fixTopicMapKeys = (topic: Topic) => {
  const topicMap = new Map<string, Topic>();
  topic.subTopics.forEach((element) => {
    topicMap.set(element.id, element);
  });
  return topicMap
}

const addTopicsToArray = (topicMap: Map<string, Topic>) => {
  topicMap.forEach((topic) => {
    topic.subTopics = fixTopicMapKeys(topic)
    topics.push(topic);
  });
}

const addLanguagesToArray = (input: InputWord) => {
  Object.keys(input).forEach((language) => {
    if (!NON_LANGUAGE_FIELDS.includes(language)) {
      const [languageName, languageCode, rtl] = language.split("_");
      languages.push({
        label: languageName,
        code: languageCode,
        rtl: rtl !== undefined,
      });
    }
  });
}

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
  
  const topicMap = new Map<string, Topic>();
  
  addLanguagesToArray(json[0])
  
  findTopics(json, topicMap)
  
  fillTopicsWithWords(json, topicMap)

  addTopicsToArray(topicMap)
};

export const fetchData = async (): Promise<void> => {
  const res = await fetch(databaseURL);
  const arrBuffer = await res.arrayBuffer();
  parseData(arrBuffer);
};
