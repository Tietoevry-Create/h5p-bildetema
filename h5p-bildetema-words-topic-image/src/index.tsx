import { registerContentType } from "h5p-utils";
import "common/polyfills";
import { H5PWrapper } from "./h5p/H5PWrapper";
import "./index.scss";

registerContentType("BildetemaTopicImageView", H5PWrapper);
