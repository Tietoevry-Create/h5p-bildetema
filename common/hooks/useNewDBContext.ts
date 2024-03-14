import { useContext } from "react";
import { NewDBContext } from "../context/NewDBContext";
import { NewData } from "../types/types";

export const useNewDBContext = (): NewData => {
  const data = useContext(NewDBContext);
  if (!data) {
    const defaultData: NewData = {
      languages: [],
      topicPaths: new Map(),
      idToWords: new Map(),
      idToContent: new Map(),
      langCodeTolanguages: new Map(),
      translations: new Map(),
    };
    return defaultData;
  }

  return data;
};
