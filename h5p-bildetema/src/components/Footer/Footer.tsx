import * as React from "react";
import { useL10n } from "../../hooks/useL10n";
import styles from "./Footer.module.scss";

export const Footer = (): JSX.Element => {
  const contactInfoLabel = useL10n("footerContactInfoLabel");
  const contactInfoHref = useL10n("footerContactInfoHref");

  const link1Label = useL10n("footerLink1Label");
  const link1Href = useL10n("footerLink1Href");

  const link2Label = useL10n("footerLink2Label");
  const link2Href = useL10n("footerLink2Href");

  const link3Label = useL10n("footerLink3Label");
  const link3Href = useL10n("footerLink3Href");

  const copyrightLabel = useL10n("footerCopyright");

  return (
    <div className={styles.footer}>
      <p>
        <a href={contactInfoHref}>{contactInfoLabel}</a>
      </p>
      <p>
        <a href={link1Href}>{link1Label}</a>
      </p>
      <p>
        <a href={link2Href}>{link2Label}</a>
      </p>
      <p>
        <a href={link3Href}>{link3Label}</a>
      </p>
      <p>{copyrightLabel}</p>
    </div>
  );
};
