import * as xlsx from "xlsx";
import { Word, Theme, Language, Database } from "../../../types";

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

const databaseURL = "https://devaudiobildetema.blob.core.windows.net/database/database.xlsx"

export const getData = async(): Promise<Database> => {
  const res = await fetch(databaseURL)
  const arrBuffer = await res.arrayBuffer()
  return parseData(arrBuffer)
}

const parseData = (data: ArrayBuffer): Database => {
  const themes: Theme[] = [];
  const languages: Language[] = [];
  const words: Word[] = [];

  const workbook = xlsx.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json = xlsx.utils.sheet_to_json<Word>(worksheet, {
    blankrows: true,
    defval: "",
  });

  const themesMap = new Map<string, Theme>();
  json.forEach((element: Word) => {
    if (element.Title.includes("T")){
      if (themesMap.has(element.Tema1)) {
        // Add subThemes
          themesMap
            .get(element.Tema1)
            ?.SubThemes?.set(element.Title, {
              ...element,
            });
        return;
      }
  
      // Add theme
      themesMap.set(element.Tema1, {
        SubThemes: new Map<string, Theme>(),
        ...element,
      });
      return
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
      const [languageName, languageCode, rlt] =
        language.split("_");
      languages.push({
        Name: languageName,
        Code: languageCode,
        Rtl: rlt === undefined ? false : true,
      });
    }
  });

  return {Themes: themes, Languages: languages, Words: words};
};
