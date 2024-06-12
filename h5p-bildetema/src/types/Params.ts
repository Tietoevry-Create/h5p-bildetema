import { InferParamsFromSemantics } from "h5p-types";
import semantics from "../../semantics.json";

export type Params = InferParamsFromSemantics<typeof semantics>;
