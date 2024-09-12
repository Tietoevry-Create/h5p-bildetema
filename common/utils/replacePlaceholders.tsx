export const replacePlaceholders = (
  text: string,
  replacements: { [key: string]: JSX.Element | string },
) => {
  return text.split(/(\{\{.+?\}\})/g).map(part => {
    if (!part.match(/(\{\{.+?\}\})/g)) return part;

    const key = part.slice(2, -2); // Remove the {{ }}
    return key in replacements ? replacements[key] : part;
  });
};
