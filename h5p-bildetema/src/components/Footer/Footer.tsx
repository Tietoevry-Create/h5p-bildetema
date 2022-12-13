import * as React from "react";
import { useL10n } from "../../hooks/useL10n";
import styles from "./Footer.module.scss";

export const Footer = (): JSX.Element => {
  const aboutLabel = useL10n("footerAboutLabel");
  const aboutHref = useL10n("footerAboutHref");

  const contactInfoLabel = useL10n("footerContactInfoLabel");
  const contactInfoHref = useL10n("footerContactInfoHref");

  const prevBildetemaLabel = useL10n("footerPrevBildetemaLabel");
  const prevBildetemaHref = useL10n("footerPrevBildetemaHref");

  const NAFOLabel = useL10n("footerNAFOLabel");
  const NAFOHref = useL10n("footerNAFOHref");

  const osloMetLabel = useL10n("footerOsloMetLabel");
  const osloMetHref = useL10n("footerOsloMetHref");

  const lexinLabel = useL10n("footerLexinLabel");
  const lexinHref = useL10n("footerLexinHref");

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
            <ul>
              <li>
                <a href={aboutHref}>{aboutLabel}</a>
              </li>
              <li>
                <a href={contactInfoHref}>{contactInfoLabel}</a>
              </li>
              <li>
                <a href={prevBildetemaHref}>{prevBildetemaLabel}</a>
              </li>
            </ul>
          </div>
          <div className={styles.footer_section}>
            <ul>
              <li>
                <a href={NAFOHref}>{NAFOLabel}</a>
              </li>
              <li>
                <a href={osloMetHref}>{osloMetLabel}</a>
              </li>
              <li>
                <a href={lexinHref}>{lexinLabel}</a>
              </li>
            </ul>
          </div>
          <div className={styles.footer_section}>
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
