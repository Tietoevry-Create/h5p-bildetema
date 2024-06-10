import "common/polyfills";
import { registerContentType } from "h5p-utils";
import semantics from "../semantics.json";
import { H5PWrapper } from "./h5p/H5PWrapper";
import "./index.scss";

registerContentType("BildetemaTopicImageView", H5PWrapper);

// Import semantics into value space to ensure that `unplugin-json-dts`
// generates the correct types.
// eslint-disable-next-line no-unused-expressions
semantics;
