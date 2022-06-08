import * as React from "react";
import { useL10n } from "../../hooks/useL10n";
import styles from "./Footer.module.scss";

export const Footer = (): JSX.Element => {
  const contactInfoLabel = useL10n("footerContactInfoLabel");

  const link1Label = useL10n("footerLink1Label");
  const link1Href = useL10n("footerLink1Href");

  const link2Label = useL10n("footerLink2Label");
  const link2Href = useL10n("footerLink2Href");

  const link3Label = useL10n("footerLink3Label");
  const link3Href = useL10n("footerLink3Href");

  return (
    <div className={styles.footer}>
      <div className={styles.heading}>{contactInfoLabel}</div>
      <div className={styles.groupedElements}>
        <a href={link1Href}>{link1Label}</a>
        <a href={link2Href}>{link2Label}</a>
        <a href={link3Href}>{link3Label}</a>
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
