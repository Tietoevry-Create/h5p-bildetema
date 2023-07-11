import type { InferParamsFromSemantics, ReadonlyDeep } from "h5p-types";
import semantics from "../../semantics.json";

export type Params = InferParamsFromSemantics<ReadonlyDeep<typeof semantics>>;

// Import semantics into value space to ensure that `unplugin-json-dts`
// generates the correct types.
// eslint-disable-next-line no-unused-expressions
semantics;
