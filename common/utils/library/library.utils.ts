import { Library } from "h5p-types";

export const getLibraryName = ({
  machineName,
  majorVersion,
  minorVersion,
}: Library): string => {
  return `${machineName} ${majorVersion}.${minorVersion}`;
};
