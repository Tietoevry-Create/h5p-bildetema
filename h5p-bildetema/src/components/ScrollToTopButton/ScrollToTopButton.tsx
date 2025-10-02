import { FC } from "react";
import { ArrowUpIcon } from "common/components/Icons/Icons";
import { useL10n } from "../../hooks/useL10n";
import styles from "./ScrollToTopButton.module.scss";

export const ScrollToTopButton: FC = () => {
  const goToTopLink = useL10n("goToTopLink");

  const handleOnClick = (): void => {
    if (typeof window === "undefined") {
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button type="button" className={styles.button} onClick={handleOnClick}>
      <span className={styles.icon} aria-hidden="true">
        <ArrowUpIcon />
      </span>
      <span>{goToTopLink}</span>
    </button>
  );
};
