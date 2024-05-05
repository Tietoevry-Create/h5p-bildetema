import { useQuery } from "@tanstack/react-query";
import { BackendUrlContext } from "common/context/BackendUrlContext";
import { NewDBContext } from "common/context/NewDBContext";
import { getNewData } from "common/utils/data.utils";
import { FC } from "react";
import { Bildetema } from "../Bildetema/Bildetema";
import "common/styles/SwiperOverride.scss";
import { SearchParamProvider } from "../../context/SearchParamContext";

type appProps = {
  defaultLanguages: string[];
  backendUrl: string;
};

export const App: FC<appProps> = ({ defaultLanguages, backendUrl }) => {
  const { isLoading, data: newData } = useQuery({
    queryKey: ["newData"],
    queryFn: () => getNewData(backendUrl),
  });

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
