import { useContext } from "react";
import { NewDBContext } from "../context/NewDBContext";
import { NewData } from "../types/types";

export const useNewDBContext = (): NewData | undefined => {
  const data = useContext(NewDBContext);
  return data;
};
