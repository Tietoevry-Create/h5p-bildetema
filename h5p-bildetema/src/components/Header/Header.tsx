import React from "react";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import styles from "./Header.module.scss";

export type HeaderProps = {
  currentLanguageCode: string;
};

export const Header: React.FC<HeaderProps> = ({ currentLanguageCode }) => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>{/* TODO: Add logo as SVG */}</div>
        <div className={styles.language_container}>
          {/* TODO: Translate */}
          <div>Språkvalg</div>
          <div className={styles.languages}>
            <p>Engelsk</p>
            <p>Norsk</p>
            <p>Nynorsk</p>
          </div>
        </div>
      </div>
      <Breadcrumbs currentLanguageCode={currentLanguageCode} />
    </>
  );
};
