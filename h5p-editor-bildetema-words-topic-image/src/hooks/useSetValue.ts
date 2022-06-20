import type { H5PSetValue } from "h5p-types";
import { useContext } from "react";
import { SetValueContext } from "../contexts/SetValueContext";
import { Params } from "../h5p/H5PWrapper";

export const useSetValue = (): H5PSetValue<Params> => {
  return useContext(SetValueContext);
};
