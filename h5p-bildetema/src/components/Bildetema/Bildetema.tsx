import React from "react";
import styles from "./Bildetema.module.scss";
import { Header } from "..";

export const Bildetema = (): JSX.Element => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header_container}>
          <Header />
        </div>
      </div>
    </div>
  );
};
