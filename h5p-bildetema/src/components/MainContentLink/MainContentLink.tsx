import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./MainContentLink.module.scss";

export const MainContentLink: React.FC = () => {
  const { mainContentLink } = useL10ns("mainContentLink");
  const { pathname } = useLocation();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const path = `#${pathname}/#bildetemaMain`;

  return (
    <nav className={styles.nav}>
      <a
        href={path} 
        className={isFocused ? styles.linkFocused : styles.link} 
        onClick={() => setIsFocused(false)} 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {mainContentLink}
      </a>
    </nav>
  );
};
