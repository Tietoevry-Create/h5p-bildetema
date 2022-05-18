import * as xlsx from "xlsx";
import { InputWord, Word, Topic, Language } from "../../../types";

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
const words: Word[] = [];

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

export const getTopic = async (
  topicTitle: string,
): Promise<Topic | undefined> => {
  return topics.find(item => item.title === topicTitle);
};

export const getWords = async (): Promise<Word[]> => {
  return words;
};

const pascalToCamel = (str: string): string => {
  let strArr = str.split("_");
  let tempStr = str.length > 1 ? str[0].toLowerCase + str.slice(1) : "";
  if (strArr.length > 1) {
    strArr = strArr.map(item => item[0].toUpperCase() + item.slice(1));
  }
  tempStr = strArr.join("");
  return tempStr.length > 1 ? tempStr[0].toLowerCase() + tempStr.slice(1) : "";
};

const pascalWordToCamelWord = (input: InputWord): Word => {
  const translations = new Map<string, string>();
  const objEntires: string[][] = [];
  Object.entries(input).forEach(([key, value]) => {
    if (NON_LANGUAGE_FIELDS.includes(key)) {
      objEntires.push([pascalToCamel(key), value]);
      return;
    }
    const [_, languageCode] = key.split("_");
    translations.set(languageCode, value);
  });
  return { ...Object.fromEntries(objEntires), translations };
};

const parseData = (data: ArrayBuffer): void => {
  languages.length = 0;
  words.length = 0;
  topics.length = 0;

  const workbook = xlsx.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json = xlsx.utils.sheet_to_json<InputWord>(worksheet, {
    blankrows: true,
    defval: "",
  });

  const topicsMap = new Map<string, Topic>();
  json.forEach((element: InputWord) => {
    const word = pascalWordToCamelWord(element);
    if (word.title.includes("T")) {
      if (topicsMap.has(word.tema1)) {
        // Add subTopics
        topicsMap.get(word.tema1)?.subTopics?.set(word.title, {
          ...word,
        });
        return;
      }

      // Add topic
      topicsMap.set(word.tema1, {
        subTopics: new Map<string, Topic>(),
        ...word,
      });
      return;
    }

    words.push({ ...word });
  });

  topicsMap.forEach(topic => {
    topics.push(topic);
  });

  // find languages
  const word: Word = words[0];
  Object.keys(word).forEach(language => {
    if (!NON_LANGUAGE_FIELDS.includes(language)) {
      const [languageName, languageCode, rtl] = language.split("_");
      languages.push({
        name: languageName,
        code: languageCode,
        rtl: rtl !== undefined,
      });
    }
  });
};

export const fetchData = async (): Promise<void> => {
  const res = await fetch(databaseURL);
  const arrBuffer = await res.arrayBuffer();
  parseData(arrBuffer);
};
