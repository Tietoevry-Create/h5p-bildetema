import { replacePlaceholders } from "common/utils/replacePlaceholders";
import { JSX } from "react";
import { useL10n } from "../../hooks/useL10n";
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

  const creativeCommonsImgAlt = useL10n("footerCreativeCommonsImgAlt");
  const creativeCommonsText = useL10n("footerCreativeCommonsText");
  const creativeCommonsLinkURL = useL10n("footerCreativeCommonsLinkURL");
  const creativeCommonsLinkText = useL10n("footerCreativeCommonsLinkText");

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
        <p className={styles.creativeCommons}>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >
            <img
              alt={creativeCommonsImgAlt}
              src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
            />
          </a>
          {creativeCommonsText}{" "}
          <a rel="license" href={creativeCommonsLinkURL}>
            {creativeCommonsLinkText}
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
