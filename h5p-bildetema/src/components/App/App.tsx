import { useQuery } from "@tanstack/react-query";
import { DBContext } from "common/context/DBContext";
import { getData } from "common/utils/data.utils";
import { FC } from "react";
import { Bildetema } from "../Bildetema/Bildetema";
import "common/styles/SwiperOverride.scss";

type appProps = {
  defaultLanguages: string[];
  backendUrl: string;
};

export const App: FC<appProps> = ({ defaultLanguages, backendUrl }) => {
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
