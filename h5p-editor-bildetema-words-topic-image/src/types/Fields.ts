import type { H5PField, H5PFieldGroup } from "h5p-types";

export type Field = H5PFieldGroup;

export type BackendUrlField = H5PField & {
  value?: string;
};
