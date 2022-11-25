import * as React from "react";
import { useL10n } from "../../hooks/useL10n";
import styles from "./Footer.module.scss";

export const Footer = (): JSX.Element => {
  const headline1 = useL10n("footerHeadline1");
  const headline2 = useL10n("footerHeadline2");
  const headline3 = useL10n("footerHeadline3");

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

  const privacyStatementLabel = useL10n("footerPrivacyStatementLabel");
  const privacyStatementHref = useL10n("footerPrivacyStatementHref");

  const accessibilityStatementLabel = useL10n(
    "footerAccessibilityStatementLabel",
  );
  const accessibilityStatementHref = useL10n(
    "footerAccessibilityStatementHref",
  );

  const copyrightLabel = useL10n("footerCopyright");

  return (
    <footer role="contentinfo" className={styles.footer}>
      <div className={styles.footer_wrapper}>
        <div className={styles.footer_content}>
          <div className={styles.footer_section}>
            <h2>{headline1}</h2>
            <ul>
              <li>
                <a href={aboutHref}>{aboutLabel}</a>
              </li>
              <li>
                <a href={contactInfoHref}>{contactInfoLabel}</a>
              </li>
            </ul>
          </div>
          <div className={styles.footer_section}>
            <h2>{headline2}</h2>
            <ul>
              <li>
                <a href={link1Href}>{link1Label}</a>
              </li>
              <li>
                <a href={link2Href}>{link2Label}</a>
              </li>
              <li>
                <a href={link3Href}>{link3Label}</a>
              </li>
            </ul>
          </div>
          <div className={styles.footer_section}>
            <h2>{headline3}</h2>
            <ul>
              <li>
                <a href={privacyStatementHref}>{privacyStatementLabel}</a>
              </li>
              <li>
                <a href={accessibilityStatementHref}>
                  {accessibilityStatementLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p>{copyrightLabel}</p>
      </div>
    </footer>
  );
};
