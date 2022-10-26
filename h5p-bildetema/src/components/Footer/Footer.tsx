import * as React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import styles from "./Footer.module.scss";

export const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.footer}>
      <div className={styles.footer_content}>
        <p className={styles.hide_from_print}>
          <a href={t("footerContactInfoHref")}>{t("footerContactInfoLabel")}</a>
        </p>
        <p>
          <a href={t("footerLink1Href")}>{t("footerLink1Label")}</a>
        </p>
        <p>
          <a href={t("footerLink2Href")}>{t("footerLink2Label")}</a>
        </p>
        <p className={styles.hide_from_print}>
          <a href={t("footerLink3Href")}>{t("footerLink3Label")}</a>
        </p>
        <p>{t("footerCopyright")}</p>
      </div>
    </div>
  );
};
