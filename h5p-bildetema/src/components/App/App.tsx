import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../../../common/utils/data.utils";
import { Bildetema } from "../Bildetema/Bildetema";
import { DBContext } from "../../../../common/context/DBContext"

type appProps = {
  defaultLanguages: string[];
  backendUrl: string;
};

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
