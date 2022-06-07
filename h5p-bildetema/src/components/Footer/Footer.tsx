import React from "react";
import styles from "./Footer.module.scss";

export const Footer = (): JSX.Element => {
  return (
    <div className={styles.footer}>
      {/* TODO: Replace with the current language translation */}
      <h4>Kontaktinformasjon</h4>
      <div className={styles.groupedElements}>
        <a href="https://nafo.oslomet.no/">
          NAFO - Nasjonalt senter for flerkulturell opplæring
        </a>
        <a href="https://oslomet.no/">OsloMet - Storbyuniversitetet</a>
        <a href="https://lexin.oslomet.no/">
          LEXIN - Nettbasert ordbok på norsk og forskjellige språk for
          minoritetsspråklige
        </a>
      </div>
      <hr className={styles.divider} />
      <p>
        Copyright © 2022 · All Rights Reserved ·{" "}
        <a href="https://nafo.oslomet.no/">NAFO</a> |{" "}
        <a href="https://oslomet.no/">OsloMet</a>
      </p>
    </div>
  );
};
