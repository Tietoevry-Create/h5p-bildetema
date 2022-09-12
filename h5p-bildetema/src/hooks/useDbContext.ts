import { useContext } from "react";
import { DBContext } from "../components/App/App";
import { Data } from "../../../common/types/types";

export const useDbContext = (): Data => {
  const data = useContext(DBContext);
  return data;
};
