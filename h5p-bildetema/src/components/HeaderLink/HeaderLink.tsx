import { JSX } from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderLink.module.scss";

type HeaderLinkProps = {
  href: string;
  label: string;
  icon: JSX.Element;
};

const HeaderLink = ({ href, label, icon }: HeaderLinkProps): JSX.Element => {
  return (
    <Link className={styles.headerLink} to={href} key={href}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.headerLinkLabel}>{label}</span>
    </Link>
  );
};

export default HeaderLink;
