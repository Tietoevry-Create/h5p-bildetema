import { FC } from "react";
import { HashLink } from "react-router-hash-link";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./MainContentLink.module.scss";

export const MainContentLink: FC = () => {
  const { mainContentLink } = useL10ns("mainContentLink");

  return (
    <nav className={styles.nav}>
      <HashLink className={styles.link} to="#bildetemaMain">
        {mainContentLink}
      </HashLink>
    </nav>
  );
};
