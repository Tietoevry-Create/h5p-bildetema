import "common/polyfills";
import { registerContentType } from "h5p-utils";
import semantics from "../semantics.json";
import { H5PWrapper } from "./h5p/H5PWrapper";
import "./index.scss";

registerContentType("BildetemaWordsGridView", H5PWrapper);

// Import semantics into value space to ensure that `unplugin-json-dts`
// generates the correct types.
semantics;
