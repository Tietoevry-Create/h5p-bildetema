import { H5PLibrary } from "h5p-types";

export const getLibraryName = ({
  machineName,
  majorVersion,
  minorVersion,
}: H5PLibrary): string => {
  return `${machineName} ${majorVersion}.${minorVersion}`;
};
