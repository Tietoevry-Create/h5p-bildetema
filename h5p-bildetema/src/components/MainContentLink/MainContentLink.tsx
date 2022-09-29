import React from "react";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./MainContentLink.module.scss";

export const MainContentLink: React.FC = () => {
  const { mainContentLink } = useL10ns("mainContentLink");

  const handleOnClick = (): void => {
    const main: HTMLElement | null = document.querySelector("#bildetemaMain");

    if (main) {
      main.tabIndex = -1;
      main.focus();
      setTimeout(() => main.removeAttribute("tabindex"), 1000);
    }
  };

  return (
    <nav className={styles.nav}>
      <button type="button" className={styles.button} onClick={handleOnClick}>
        {mainContentLink}
      </button>
    </nav>
  );
};
