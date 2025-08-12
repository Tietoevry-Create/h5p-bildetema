/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { JSX } from "react";

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

export const replacePlaceholdersWithHTML = (
  text: string,
  keyStart: string,
  keyEnd: string,
  htmlType?: keyof HTMLElementTagNameMap, // Type of HTML element to create
  html?: JSX.Element, // Optional HTML element to use
) => {
  const regexStart = new RegExp(`\\{\\{(${keyStart})\\}\\}`, "g");
  const regexEnd = new RegExp(`\\{\\{(${keyEnd})\\}\\}`, "g");
  const combinedRegex = new RegExp(
    `(\\{\\{${keyStart}\\}\\}.*?\\{\\{${keyEnd}\\}\\})`,
    "g",
  ); // Match everything between {{keyStart}} and {{keyEnd}}

  return text.split(combinedRegex).map(part => {
    if (!part.match(combinedRegex)) return part;

    const middlePart = part.replace(regexStart, "").replace(regexEnd, "");
    if (!middlePart) return part;

    if (htmlType !== undefined) {
      const htmlElement = React.createElement(htmlType);
      htmlElement.props.children = middlePart;
      return htmlElement;
    }

    if (html !== undefined) {
      const newHtml = React.cloneElement(html, {}, middlePart);
      return newHtml;
    }

    return part;
  });
};
