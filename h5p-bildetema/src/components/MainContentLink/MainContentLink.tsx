import React, { useState } from "react";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./MainContentLink.module.scss";

export const MainContentLink: React.FC = () => {
  const { mainContentLink } = useL10ns("mainContentLink");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleOnClick = (): void => {
    setIsFocused(false);
    const container: HTMLElement | null =
      document.querySelector("#bildetemaMain");

    if (container) {
      container.tabIndex = -1;
      container.focus();
      setTimeout(() => container.removeAttribute("tabindex"), 1000);
    }
  };

  return (
    <nav className={styles.nav}>
      <button
        type="button"
        className={isFocused ? styles.linkFocused : styles.link}
        onClick={handleOnClick}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {mainContentLink}
      </button>
    </nav>
  );
};
