import { FileType } from "./FileType";

export type AudioFile = Pick<FileType, "mimeType"> & { url: string };
