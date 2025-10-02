import { FC } from "react";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./MainContentLink.module.scss";

export const MainContentLink: FC = () => {
  const { mainContentLink } = useL10ns("mainContentLink");

  // Manually focuses on #bildetemaMain because we don't want to mess with the
  // url for the users since they copy the url often and #bildetemaMain will not
  // make sense to them.
  // We're using HashRouter and could use HashLink from react-router-hash-link,
  // to link to #bildetemaMain, but then #bildetemaMain would be added to the url
  // when clicking the link, which we don't want. So we just use a button and
  // handle focus manually.
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
