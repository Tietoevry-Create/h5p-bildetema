export const labelToUrlComponent = (label: string): string => {
  return label?.toLowerCase().replace(" ", "-").replace("/", "%2F");
};
