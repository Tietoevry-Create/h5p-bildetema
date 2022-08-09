export const labelToUrlComponent = (label: string): string => {
  return label.toLowerCase().replaceAll(" ", "-").replaceAll("/", "%2F");
};
