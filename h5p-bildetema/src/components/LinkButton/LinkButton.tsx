import { JSX } from "react";
import { Link } from "react-router-dom";
import styles from "./LinkButton.module.scss";

type LinkButtonProps = {
  href: string;
  label: string;
  icon: JSX.Element;
};

const LinkButton = ({ href, label, icon }: LinkButtonProps): JSX.Element => {
  return (
    <Link className={styles.linkButton} to={href} key={label}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.linkButtonLabel}>{label}</span>
    </Link>
  );
};

export default LinkButton;
