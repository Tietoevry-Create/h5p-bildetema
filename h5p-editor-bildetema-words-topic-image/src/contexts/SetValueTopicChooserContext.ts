import type { H5PSetValue } from "h5p-types";
import { createContext } from "react";
import { Params as ChooseTopicParams } from "../h5p/ChooseTopicH5PWrapper";

export const SetValueTopicChooserContext = createContext<
  H5PSetValue<ChooseTopicParams>
>(() => undefined);
