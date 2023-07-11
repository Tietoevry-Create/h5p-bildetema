import { FC } from "react";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./MainContentLink.module.scss";

export const MainContentLink: FC = () => {
  const { mainContentLink } = useL10ns("mainContentLink");

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
        {mainContentLink}
      </button>
    </nav>
  );
};
