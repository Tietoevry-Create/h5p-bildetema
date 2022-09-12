import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../../../common/utils/data.utils";
import { Bildetema } from "../Bildetema/Bildetema";
import { Data } from "../../../../common/types/types";

type appProps = {
  defaultLanguages: string[];
  backendUrl: string;
};

export const DBContext = React.createContext<Data>(undefined);

export const App: React.FC<appProps> = ({ defaultLanguages, backendUrl }) => {
  const { isLoading: isLoadingData, data } = useQuery(["dataFromDB"], () =>
    getData(backendUrl),
  );

  return (
    <DBContext.Provider value={data}>
      <Bildetema
        defaultLanguages={defaultLanguages}
        isLoadingData={isLoadingData}
      />
    </DBContext.Provider>
  );
};
