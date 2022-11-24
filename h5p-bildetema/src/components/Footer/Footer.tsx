import * as React from "react";
import { useL10n } from "../../hooks/useL10n";
import styles from "./Footer.module.scss";

export const Footer = (): JSX.Element => {
  const aboutLabel = useL10n("footerAboutLabel");
  const aboutHref = useL10n("footerAboutHref");

  const contactInfoLabel = useL10n("footerContactInfoLabel");
  const contactInfoHref = useL10n("footerContactInfoHref");

  const link1Label = useL10n("footerLink1Label");
  const link1Href = useL10n("footerLink1Href");

  const link2Label = useL10n("footerLink2Label");
  const link2Href = useL10n("footerLink2Href");

  const link3Label = useL10n("footerLink3Label");
  const link3Href = useL10n("footerLink3Href");

  const copyrightLabel = useL10n("footerCopyright");

  const navAriaLabel = "information"; // TODO: translate

  return (
    <footer role="contentinfo" className={styles.footer}>
      <nav aria-label={navAriaLabel} className={styles.footer_content}>
        <a href={aboutHref} className={styles.hide_from_print}>
          {aboutLabel}
        </a>
        <a href={contactInfoHref} className={styles.hide_from_print}>
          {contactInfoLabel}
        </a>
        <a href={link1Href}>{link1Label}</a>
        <a href={link2Href}>{link2Label}</a>
        <a href={link3Href} className={styles.hide_from_print}>
          {link3Label}
        </a>
        <p>{copyrightLabel}</p>
      </nav>
    </footer>
  );
};
