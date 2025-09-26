import { replacePlaceholders } from "common/utils/replacePlaceholders";
import { JSX } from "react";
import { useL10n } from "../../hooks/useL10n";
import { ScrollToTopButton } from "../ScrollToTopButton/ScrollToTopButton";
import styles from "./Footer.module.scss";

export const Footer = (): JSX.Element => {
  const aboutLabel = useL10n("footerAboutLabel");
  const aboutHref = useL10n("footerAboutHref");

  const contactInfoLabel = useL10n("footerContactInfoLabel");
  const contactInfoHref = useL10n("footerContactInfoHref");

  const NAFOLabel = useL10n("footerNAFOLabel");
  const NAFOHref = useL10n("footerNAFOHref");

  const link1Label = useL10n("footerLink1Label");
  const link1Href = useL10n("footerLink1Href");

  const link2Label = useL10n("footerLink2Label");
  const link2Href = useL10n("footerLink2Href");

  const privacyStatementLabel = useL10n("footerPrivacyStatementLabel");
  const privacyStatementHref = useL10n("footerPrivacyStatementHref");

  const accessibilityStatementLabel = useL10n(
    "footerAccessibilityStatementLabel",
  );
  const accessibilityStatementHref = useL10n(
    "footerAccessibilityStatementHref",
  );

  const currentYear = new Date().getFullYear().toString();
  const footerCopyrightLabel = useL10n("footerCopyright");
  const copyrightLabel = replacePlaceholders(footerCopyrightLabel, {
    year: currentYear,
  });

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
                <a href={privacyStatementHref}>{privacyStatementLabel}</a>
              </li>
              <li>
                <a href={accessibilityStatementHref}>
                  {accessibilityStatementLabel}
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.footer_section}>
            <ul>
              <li><a href="#">{"English version"}</a></li>
              <li><a href="#">{"Dansk version"}</a></li>
              <li><a href="#">{"Íslensk útgáfa"}</a></li>
              <li><a href="#">{"Norsk versjon (bokmål)"}</a></li>
              <li><a href="#">{"Norsk versjon (nynorsk)"}</a></li>
              <li><a href="#">{"Svensk version"}</a></li>
            </ul>
          </div>
          <div className={styles.footer_section}>
            <ul>
              <li>
                <a href={NAFOHref}>{NAFOLabel}</a>
              </li>
              <li>
                <a href={link1Href}>{link1Label}</a>
              </li>
              <li>
                <a href={link2Href}>{link2Label}</a>
              </li>
            </ul>
          </div>
          {/*
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
          */}
        </div>
        <div className={styles.footer_to_top}>
          <ScrollToTopButton />
        </div>
      </div>
      <div className={styles.copyright}><p>{copyrightLabel}</p></div>
    </footer>
  );
};
