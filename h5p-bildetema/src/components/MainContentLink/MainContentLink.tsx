import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import styles from "./MainContentLink.module.scss";

export const MainContentLink: React.FC = () => {
  const { t } = useTranslation();

  // Hand craft `<a href="#bildetemaMain">` because we're using HashRouter
  // and can't use the builtin functionality.
  const handleOnClick = (): void => {
    const main: HTMLElement | null = document.querySelector("#bildetemaMain");

    if (main) {
      main.tabIndex = -1;
      main.focus();
    }
  };

  return (
    <nav className={styles.nav}>
      <button type="button" className={styles.button} onClick={handleOnClick}>
        {t("mainContentLink")}
      </button>
    </nav>
  );
};
