export const labelToUrlComponent = (label: string): string => {
  return label.replaceAll(" ", "-").replaceAll("/", "%2F").replaceAll("?", "");
};
