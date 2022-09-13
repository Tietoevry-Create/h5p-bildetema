import { useContext } from "react";
import { DBContext } from "../context/DBContext";
import { Data } from "../types/types";

export const useDBContext = (): Data | undefined => {
  const data = useContext(DBContext);
  return data;
};
