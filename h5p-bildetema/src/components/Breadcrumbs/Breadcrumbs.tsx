import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { BreadcrumbsArrowIcon } from "../Icons/Icons";
import styles from "./Breadcrumbs.module.scss";

const routes = [{ path: "/nb", breadcrumb: "Norsk (bokmål)" }];

export type BreadcrumbsProps = {
  breadCrumbs?: {
    label: string;
    path: string;
  }[];
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadCrumbs }) => {
  const breadcrumbs = useBreadcrumbs(routes);

  return !breadCrumbs ? (
    <div className={styles.Breadcrumbs}>
      {breadcrumbs.map(({ breadcrumb, key }, index) =>
        index !== breadcrumbs.length - 1 ? (
          <span key={key}>
            <Link to={key} className={styles.link}>
              {decodeURIComponent(
                (breadcrumb as React.ReactPortal).props.children,
              )}
            </Link>
            <span className={styles.arrow}>
              <BreadcrumbsArrowIcon />
            </span>
          </span>
        ) : (
          <span className={styles.currentPage} key={key}>
            {decodeURIComponent(
              (breadcrumb as React.ReactPortal).props.children,
            )}
          </span>
        ),
      )}
    </div>
  ) : (
    <div className={styles.Breadcrumbs}>
      {breadCrumbs.map(({ label, path }, index) =>
        index !== breadCrumbs.length - 1 ? (
          <span key={path}>
            <Link to={path} className={styles.link}>
              {label}
            </Link>
            <span className={styles.arrow}>
              <BreadcrumbsArrowIcon />
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
