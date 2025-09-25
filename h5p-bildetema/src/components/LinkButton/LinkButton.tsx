import { JSX } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styles from "./LinkButton.module.scss";

type LinkButtonProps = {
  href: string;
  label: string;
  icon: JSX.Element;
  hideLabel?: boolean;
  hash?: boolean;
};

const LinkButton = ({ href, label, icon, hideLabel, hash }: LinkButtonProps): JSX.Element => {
  if (hash) {
    return (
      <HashLink className={styles.linkButton} to={href} key={label}>
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
        <span className={hideLabel ? styles.linkButtonLabelHidden : styles.linkButtonLabel}>{label}</span>
      </HashLink>
    );
  }

  return (
    <Link className={styles.linkButton} to={href} key={label}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={hideLabel ? styles.linkButtonLabelHidden : styles.linkButtonLabel}>{label}</span>
    </Link>
  );
};

export default LinkButton;
