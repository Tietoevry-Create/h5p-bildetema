import { useQuery } from "@tanstack/react-query";
import { BackendUrlContext } from "common/context/BackendUrlContext";
import { NewDBContext } from "common/context/NewDBContext";
import { getNewData } from "common/utils/data.utils";
import { FC } from "react";
import { Bildetema } from "../Bildetema/Bildetema";
import "common/styles/SwiperOverride.scss";

type appProps = {
  defaultLanguages: string[];
  backendUrl: string;
};

export const App: FC<appProps> = ({ defaultLanguages, backendUrl }) => {
  const { isLoading, data: newData } = useQuery(["newData"], async () => {
    return getNewData(backendUrl);
    // return getNewData("http://127.0.0.1:10000/devstoreaccount1/data/newData.json.tar.gz");
  });

  const baseBackendurl = backendUrl.split("data/").at(0) || "";

  return (
    <BackendUrlContext.Provider value={baseBackendurl}>
      <NewDBContext.Provider value={newData}>
        <Bildetema
          defaultLanguages={defaultLanguages}
          isLoadingData={isLoading}
        />
      </NewDBContext.Provider>
    </BackendUrlContext.Provider>
  );
};
