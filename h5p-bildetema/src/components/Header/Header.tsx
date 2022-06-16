import React from "react";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import styles from "./Header.module.scss";

export const Header = (): JSX.Element => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>{/* TODO: Add logo as SVG */}</div>
        <div className={styles.language_container}>
          <div>Språkvalg</div>
          <div className={styles.languages}>
            <p>Engelsk</p>
            <p>Norsk</p>
            <p>Nynorsk</p>
          </div>
        </div>
      </div>
      <Breadcrumbs />
    </>
  );
};
