import { useQuery } from "@tanstack/react-query";
import { BackendUrlContext } from "common/context/BackendUrlContext";
import { NewDBContext } from "common/context/NewDBContext";
import { DBContext } from "common/context/DBContext";
import { getData } from "common/utils/data.utils";
import { FC } from "react";
import SuperJSON from "superjson";
import { NewData } from "common/types/types";
import { Bildetema } from "../Bildetema/Bildetema";
import "common/styles/SwiperOverride.scss";

type appProps = {
  defaultLanguages: string[];
  backendUrl: string;
};

export const App: FC<appProps> = ({ defaultLanguages, backendUrl }) => {
  // const { isLoading: isLoadingData, data } = useQuery(["dataFromDB"], () =>
  //   getData(backendUrl),
  // );

  // TODO
  const { isLoading, data: newData } = useQuery(["newData"], async () => {
    const res = await fetch(
      "https://cdn-dev-bildetema.azureedge.net/data/dataTest.json.tar.gz",
      // "http://127.0.0.1:10000/devstoreaccount1/data/helloWorld.json.tar.gz",
    );
    const text = await res.text();
    const dataObj = SuperJSON.parse(text) as NewData;
    return {
      ...dataObj,
      languages: Array.from(dataObj.langCodeTolanguages.values()),
    } as NewData;
  });

  const baseBackendurl = backendUrl.split("data/").at(0) || "";

  return (
    <BackendUrlContext.Provider value={baseBackendurl}>
      {/* <DBContext.Provider value={data}> */}
        <NewDBContext.Provider value={newData}>
          <Bildetema
            defaultLanguages={defaultLanguages}
            isLoadingData={isLoading}
          />
        </NewDBContext.Provider>
      {/* </DBContext.Provider> */}
    </BackendUrlContext.Provider>
  );
};
