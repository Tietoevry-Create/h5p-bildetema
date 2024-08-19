/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

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
