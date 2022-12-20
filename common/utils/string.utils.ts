import replaceSpecialCharacters from "replace-special-characters";

export const labelToUrlComponent = (label: string): string => {
  return replaceSpecialCharacters(
    label
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("/", "%2F")
      .replaceAll("?", "")
      .replaceAll(",", ""),
  );
};
