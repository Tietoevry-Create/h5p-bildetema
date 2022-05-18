import * as xlsx from "xlsx";
import { Word, Theme, Language } from "../../../types";

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
const themes: Theme[] = [];
const words: Word[] = [];

export const getLanguages = (): Language[] => {
  return languages;
};

export const getLanguage = (languageCode: string): Language | undefined => {
  return languages.find(item => item.Code === languageCode);
};

export const getThemes = (): Theme[] => {
  return themes;
};

export const getTheme = (themeTitle: string): Theme | undefined => {
  return themes.find(item => item.Title === themeTitle);
};

export const getWords = (): Word[] => {
  return words;
};

export const fetchData = async () => {
  const res = await fetch(databaseURL);
  const arrBuffer = await res.arrayBuffer();
  parseData(arrBuffer);
};

const parseData = (data: ArrayBuffer) => {
  languages.length = 0;
  words.length = 0;
  themes.length = 0;

  const workbook = xlsx.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json = xlsx.utils.sheet_to_json<Word>(worksheet, {
    blankrows: true,
    defval: "",
  });

  const themesMap = new Map<string, Theme>();
  json.forEach((element: Word) => {
    if (element.Title.includes("T")) {
      if (themesMap.has(element.Tema1)) {
        // Add subThemes
        themesMap.get(element.Tema1)?.SubThemes?.set(element.Title, {
          ...element,
        });
        return;
      }

      // Add theme
      themesMap.set(element.Tema1, {
        SubThemes: new Map<string, Theme>(),
        ...element,
      });
      return;
    }

    words.push({ ...element });
  });

  themesMap.forEach(theme => {
    themes.push(theme);
  });

  // find languages
  const word: Word = json[0];
  Object.keys(word).forEach(language => {
    if (!NON_LANGUAGE_FIELDS.includes(language)) {
      const [languageName, languageCode, rlt] = language.split("_");
      languages.push({
        Name: languageName,
        Code: languageCode,
        Rtl: rlt === undefined ? false : true,
      });
    }
  });
};
