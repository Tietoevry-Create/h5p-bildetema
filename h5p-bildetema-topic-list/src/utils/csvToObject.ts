import * as xlsx from "xlsx";
import { InputWord, Word, Theme, Language } from "../../../types";

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

export const getLanguages = async (): Promise<Language[]> => {
  return languages;
};

export const getLanguage = async (languageCode: string): Promise<Language|undefined> => {
  return languages.find(item => item.code === languageCode);
};

export const getThemes = async (): Promise<Theme[]> => {
  return themes;
};

export const getTheme = async (themeTitle: string): Promise<Theme | undefined> => {
  return themes.find(item => item.title === themeTitle);
};

export const getWords = async (): Promise<Word[]> => {
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
  const json = xlsx.utils.sheet_to_json<InputWord>(worksheet, {
    blankrows: true,
    defval: "",
  });

  const themesMap = new Map<string, Theme>();
  json.forEach((element: InputWord) => {
    const word = pascalWordToCamelWord(element)
    if (word.title.includes("T")) {
      if (themesMap.has(word.tema1)) {
        // Add subThemes
        themesMap.get(word.tema1)?.subThemes?.set(word.title, {
          ...word,
        });
        return;
      }

      // Add theme
      themesMap.set(word.tema1, {
        subThemes: new Map<string, Theme>(),
        ...word,
      });
      return;
    }

    words.push({ ...word });
  });

  themesMap.forEach(theme => {
    themes.push(theme);
  });

  // find languages
  const word: Word = words[0];
  Object.keys(word).forEach(language => {
    if (!NON_LANGUAGE_FIELDS.includes(language)) {
      const [languageName, languageCode, rtl] = language.split("_");
      languages.push({
        name: languageName,
        code: languageCode,
        rtl: rtl === undefined ? false : true,
      });
    }
  });
  console.log(themes)
};

const pascalToCamel = (str: string): string => {
  let strArr = str.split("_");
  str = str.length > 1 ? str[0].toLowerCase + str.slice(1) : "";
  if ( strArr.length>1 ) {
    strArr = strArr.map(item => item[0].toUpperCase() + item.slice(1))
  }
  str = strArr.join("");
  return str.length > 1 ? str[0].toLowerCase() + str.slice(1) : ""
}

const pascalWordToCamelWord = (input: InputWord): Word => {
  const translations = new Map<string,string>()
  const objEntires: string[][] = []
  Object.entries(input).map(([key, value]) => {
    if( NON_LANGUAGE_FIELDS.includes(key)) {
      objEntires.push([pascalToCamel(key), value])
      return
    }
    const [_ , languageCode] = key.split("_")
    translations.set(languageCode, value)
  })
   return {...Object.fromEntries(objEntires), translations}
}
