import { InferParamsFromSemantics } from "h5p-types";
import semantics from "../../semantics.json";

export type Params = InferParamsFromSemantics<typeof semantics>;
export type TranslationKey = keyof Params["l10n"];

// Import semantics into value space to ensure that `unplugin-json-dts`
// generates the correct types.
// eslint-disable-next-line no-unused-expressions
semantics;
