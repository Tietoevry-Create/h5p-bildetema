import { createContext } from "react";
import { Params } from "../h5p/H5PWrapper";

export const SetValueContext = createContext<(params: Params) => void>(
  () => undefined,
);
