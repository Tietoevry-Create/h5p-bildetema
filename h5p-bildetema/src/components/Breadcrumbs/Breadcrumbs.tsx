import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { BreadcrumbsArrowIcon } from "../Icons/Icons";
import styles from "./Breadcrumbs.module.scss";

const routes = [{ path: "/nb", breadcrumb: "Norsk (bokmål)" }];

export const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className={styles.Breadcrumbs}>
      {breadcrumbs.map(({ breadcrumb, key }, index) =>
        index !== breadcrumbs.length - 1 ? (
          <span key={key}>
            <Link to={key} className={styles.link}>
              {breadcrumb}
            </Link>
            <span className={styles.arrow}>
              <BreadcrumbsArrowIcon />
            </span>
          </span>
        ) : (
          <span className={styles.currentPage} key={key}>
            {breadcrumb}
          </span>
        ),
      )}
    </div>
  );
};
