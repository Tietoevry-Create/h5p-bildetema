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
  return (
    <div className={styles.Breadcrumbs}>
      {breadcrumbs.map(({ label, path }, index) =>
        index !== breadcrumbs.length - 1 ? (
          <span key={path}>
            <Link to={path} className={styles.link}>
              {label}
            </Link>
            <span className={styles.arrow}>
              <svg
                width="10"
                height="17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 17 .067 15.567l6.6-6.6-6.6-6.6L1.5.933l8.034 8.034L1.5 17Z"
                  fill="currentcolor"
                />
              </svg>
            </span>
          </span>
        ) : (
          <span className={styles.currentPage} key={path}>
            {label}
          </span>
        ),
      )}
    </div>
  );
};
