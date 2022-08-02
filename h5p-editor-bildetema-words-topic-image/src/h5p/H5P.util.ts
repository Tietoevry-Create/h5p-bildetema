import { H5PEditor } from "h5p-utils";
import type { libraryStrings } from "../../language/en.json";
import { library } from "../library";

export const t: (
  key: keyof typeof libraryStrings,
  vars?: Record<string, string> | undefined,
) => string = H5PEditor.t.bind(
  null,
  library.machineName as `H5PEditor.${string}`,
);
