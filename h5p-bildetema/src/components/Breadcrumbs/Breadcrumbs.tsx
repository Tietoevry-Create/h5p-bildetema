import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";

export type BreadcrumbsProps = {
  breadcrumbs: {
    label: string;
    path: string;
  }[];
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  if (breadcrumbs.length <= 1) return null
  
  return (
    <div className={styles.Breadcrumbs}>
      {breadcrumbs.map(({ label, path }, index) => (
        index !== breadcrumbs.length -1 ?
        <span key={path}>
          <Link to={path} className={styles.link}>
            {label}
          </Link>
          <span className={styles.arrow}>&gt;</span>
        </span>
          : <span key={path}>{label}</span>
      ))}
    </div>
  );
};
