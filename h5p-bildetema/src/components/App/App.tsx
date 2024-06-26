/* eslint-disable no-restricted-syntax */
import { useQuery } from "@tanstack/react-query";
import { BackendUrlContext } from "common/context/BackendUrlContext";
import { NewDBContext } from "common/context/NewDBContext";
import { getNewData } from "common/utils/data.utils";
import { Collection, NewWord } from "common/types/types";
import { LOCAL_STORAGE_KEYS } from "common/constants/local-storage-keys";
import useLocalStorageState from "use-local-storage-state";
import { FC, useEffect } from "react";
import { Bildetema } from "../Bildetema/Bildetema";
import "common/styles/SwiperOverride.scss";
import { SearchParamProvider } from "../../context/SearchParamContext";

type appProps = {
  defaultLanguages: string[];
  backendUrl: string;
};

function setIsInCollectionProp(
  myCollections: Collection[],
  words: NewWord[],
): void {
  const wordIdsInCollections = new Set<string>();
  for (const collection of myCollections) {
    for (const wordId of collection.wordsIds) {
      wordIdsInCollections.add(wordId);
    }
  }

  for (const word of words) {
    word.isInCollection = wordIdsInCollections.has(word.id);
  }
}

export const App: FC<appProps> = ({ defaultLanguages, backendUrl }) => {
  const { isLoading, data: newData } = useQuery(["newData"], async () => {
    return getNewData(backendUrl);
  });

  const [myCollections] = useLocalStorageState<Collection[]>(
    LOCAL_STORAGE_KEYS.MY_COLLECTIONS,
    { defaultValue: [] },
  );

  useEffect(() => {
    if (!newData || !myCollections.length) return;

    const words = Array.from(newData.idToWords?.values() ?? []);
    setIsInCollectionProp(myCollections, words);
  }, [newData, myCollections]);

  const baseBackendurl = backendUrl.split("data/").at(0) || "";

  return (
    <BackendUrlContext.Provider value={baseBackendurl}>
      <NewDBContext.Provider value={newData}>
        <SearchParamProvider>
          <Bildetema
            defaultLanguages={defaultLanguages}
            isLoadingData={isLoading}
          />
        </SearchParamProvider>
      </NewDBContext.Provider>
    </BackendUrlContext.Provider>
  );
};
