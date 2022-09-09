// import * as xlsx from "xlsx";
import { LanguageCode } from "../types/LanguageCode";
import {
  // ImageUrl,
  // InputWord,
  Language,
  Topic,
  Word,
  JSONTopic,
  JSONData,
} from "../types/types";
// import { getAudioURLs } from "./audio/audio.utils";

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
let backendURL = "https://cdn-prodbildetema.azureedge.net/data/database.json";

export const getTopics = async (): Promise<Topic[]> => {
  if (!topics.length) {
    await fetchJson();
    // await fetchData();
  }
  return topics;
};

export const getData = async (
  databaseUrl: string,
): Promise<{
  topics: Topic[];
  languages: Language[];
}> => {
  if (databaseUrl !== "") backendURL = databaseUrl;

  if (!topics.length || languages.length) {
    await fetchJson();
    // await fetchData();
  }
  return { topics, languages };
};

const convertJsonToTopicsArray = (jsonTopic: JSONTopic[]): Topic[] => {
  const t: Topic[] = [];
  jsonTopic.forEach(topic => {
    const subTopics = new Map<string, Topic>();
    Object.values(topic.subTopics).forEach(subtopic => {
      const subTopicMap = new Map<string, Topic>();
      const labelTranslations = new Map<LanguageCode, Word>(
        Object.entries(subtopic.labelTranslations) as [LanguageCode, Word][],
      );
      const words = new Map<LanguageCode, Word[]>(
        Object.entries(subtopic.words) as [LanguageCode, Word[]][],
      );
      subTopics.set(subtopic.id, {
        id: subtopic.id,
        label: subtopic.label,
        images: subtopic.images,
        subTopics: subTopicMap,
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
};

// Can be removed when verified that the above is working

// const setTopic = (topic: Topic, map: Map<string, Topic>) => {
//   map.set(topic.label, topic);
//   languages.forEach(language => {
//     topic.words.set(language.code, []);
//     topic.labelTranslations.set(language.code, {
//       id: "",
//       label: "",
//       images: [],
//     });
//   });
// };

// const findSubTopics = (
//   inputWords: InputWord[],
//   topicMap: Map<string, Topic>,
// ): void => {
//   inputWords.forEach((inputWord: InputWord) => {
//     const isSubTopic =
//       inputWord.Title.includes("T") &&
//       inputWord.Bokmål_nob.toLocaleLowerCase() !==
//         inputWord.Tema1.toLocaleLowerCase();

//     if (!isSubTopic) return;

//     const topic: Topic = {
//       id: inputWord.Title,
//       label: inputWord.Bokmål_nob,
//       labelTranslations: new Map(),
//       subTopics: new Map(),
//       words: new Map(),
//       images: findImages(inputWord),
//     };
//     setTopic(topic, topicMap.get(inputWord.Tema1)!.subTopics);
//   });
// };

// const findMainTopics = (
//   inputWords: InputWord[],
//   topicMap: Map<string, Topic>,
// ): void => {
//   inputWords.forEach((inputWord: InputWord) => {
//     const isMainTopic =
//       inputWord.Title.includes("T") &&
//       inputWord.Bokmål_nob.toLocaleLowerCase() ===
//         inputWord.Tema1.toLocaleLowerCase();
//     if (!isMainTopic) return;

//     if (!topicMap.has(inputWord.Tema1)) {
//       const topic: Topic = {
//         id: inputWord.Title,
//         label: inputWord.Tema1,
//         labelTranslations: new Map(),
//         subTopics: new Map(),
//         words: new Map(),
//         images: findImages(inputWord),
//       };
//       setTopic(topic, topicMap);
//     }
//   });
// };

// const findTopics = (inputWords: InputWord[], topicMap: Map<string, Topic>) => {
//   findMainTopics(inputWords, topicMap);
//   findSubTopics(inputWords, topicMap);
// };

// const findImages = (inputWord: InputWord): Array<ImageUrl> => {
//   return Object.entries(inputWord)
//     .filter(([key, imageUrl]) => key.includes("Bilde") && imageUrl !== "")
//     .map(([, imageUrl]) => {
//       const fileName = imageUrl.split("/").pop() || "";

//       return {
//         src: `${imageContainerURL}large/${fileName}`,
//         srcSets: [
//           { src: `${imageContainerURL}small/${fileName}`, width: 200 },
//           { src: `${imageContainerURL}medium/${fileName}`, width: 350 },
//           { src: `${imageContainerURL}large/${fileName}`, width: 600 },
//           { src: `${imageContainerURL}xlarge/${fileName}`, width: 1000 },
//         ],
//       };
//     });
// };

// const fillTopicsWithWords = (
//   inputWords: InputWord[],
//   topicMap: Map<string, Topic>,
// ) => {
//   inputWords.forEach((inputWord: InputWord) => {
//     const images: ImageUrl[] = findImages(inputWord);

//     if (inputWord.Title.includes("T")) {
//       Object.entries(inputWord).forEach(([key, value]) => {
//         if (NON_LANGUAGE_FIELDS.includes(key)) return;
//         const [_, strLanguageCode] = key.split("_");
//         const languageCode = strLanguageCode as LanguageCode;
//         const word: Word = {
//           audioFiles: [],
//           id: inputWord.Title,
//           label: value,
//           images: images,
//         };

//         const wordInSubTopic = inputWord.Bokmål_nob !== inputWord.Tema1;
//         if (wordInSubTopic) {
//           topicMap
//             .get(inputWord.Tema1)
//             ?.subTopics.get(inputWord.Bokmål_nob)
//             ?.labelTranslations.set(languageCode, word);
//         } else {
//           topicMap
//             .get(inputWord.Tema1)
//             ?.labelTranslations.set(languageCode, word);
//         }
//       });
//       return;
//     }

//     Object.entries(inputWord).forEach(([key, value]) => {
//       if (NON_LANGUAGE_FIELDS.includes(key)) return;
//       const [_, strLanguageCode] = key.split("_");
//       const languageCode = strLanguageCode as LanguageCode;
//       const word: Word = {
//         audioFiles: getAudioURLs(
//           audioContainerURL,
//           languageCode,
//           inputWord.Title,
//         ),
//         id: inputWord.Title,
//         label: value,
//         images: images,
//       };
//       const wordInSubTopic = inputWord.Undertema1 !== inputWord.Tema1;
//       if (wordInSubTopic) {
//         topicMap
//           .get(inputWord.Tema1)
//           ?.subTopics.get(inputWord.Undertema1)
//           ?.words.get(languageCode)
//           ?.push(word);
//         return;
//       }
//       topicMap.get(inputWord.Tema1)?.words.get(languageCode)?.push(word);
//     });
//   });
// };

// const fixTopicMapKeys = (topic: Topic) => {
//   const topicMap = new Map<string, Topic>();
//   topic.subTopics.forEach(subTopic => {
//     topicMap.set(subTopic.id, subTopic);
//   });
//   return topicMap;
// };

// const addTopicsToArray = (topicMap: Map<string, Topic>) => {
//   topicMap.forEach(topic => {
//     topic.subTopics = fixTopicMapKeys(topic);
//     topics.push(topic);
//   });
// };

// const addLanguagesToArray = (input: InputWord) => {
//   Object.keys(input).forEach(language => {
//     if (!NON_LANGUAGE_FIELDS.includes(language)) {
//       if (input[language] === "") return;
//       const [languageName, strLanguageCode, rtl] = language.split("_");
//       const languageCode = strLanguageCode as LanguageCode;
//       languages.push({
//         label: languageName,
//         code: languageCode,
//         rtl: rtl !== undefined,
//       });
//     }
//   });
// };

// const parseData = (data: ArrayBuffer): void => {
//   languages.length = 0;
//   topics.length = 0;

//   const workbook = xlsx.read(data, { type: "array" });
//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];
//   const inputWords = xlsx.utils.sheet_to_json<InputWord>(worksheet, {
//     blankrows: true,
//     defval: "",
//   });
//   const topicMap = new Map<string, Topic>();

//   addLanguagesToArray(inputWords[0]);

//   findTopics(inputWords, topicMap);

//   fillTopicsWithWords(inputWords, topicMap);

//   addTopicsToArray(topicMap);
// };

// export const fetchData = async (): Promise<void> => {
//   const res = await fetch(databaseURL);
//   const arrBuffer = await res.arrayBuffer();
//   parseData(arrBuffer);
// };
