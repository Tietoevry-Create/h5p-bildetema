import React from "react";
import styles from "./LanguageDropdown.module.scss";

type LanguageDropdownProps = {
  test: string;
};

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ test }) => {
  return <h1>{test}</h1>;
};
