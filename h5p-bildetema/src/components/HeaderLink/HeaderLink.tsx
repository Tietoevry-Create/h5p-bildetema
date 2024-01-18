import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderLink.module.scss";
import { SearchIcon } from "../Icons/Icons";

type HeaderLinkProps = {
  href: string;
};

const HeaderLink = ({ href }: HeaderLinkProps): JSX.Element => {
  return (
    <Link className={styles.headerLink} to={href} key={href}>
      <span className={styles.icon} aria-hidden="true">
        <SearchIcon />
      </span>

      <span>Søk</span>
    </Link>
  );
};

export default HeaderLink;
