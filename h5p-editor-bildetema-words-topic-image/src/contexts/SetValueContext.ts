import type { H5PSetValue } from "h5p-types";
import { createContext } from "react";
import { Params } from "../h5p/H5PWrapper";

export const SetValueContext = createContext<(params:Params) => void>(
  () => undefined,
);
