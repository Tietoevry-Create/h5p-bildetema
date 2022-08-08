import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useL10n } from "use-h5p";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { BreadcrumbsArrowIcon } from "../Icons/Icons";
import styles from "./Breadcrumbs.module.scss";

export type BreadcrumbsProps = {
  breadCrumbs?: {
    label: string;
    path: string;
  }[];
  currentLanguageCode: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadCrumbs,
  currentLanguageCode,
}) => {
  const topicLabel = useL10n("breadcrumbsTopic");
  const routes = [{ path: `/${currentLanguageCode}`, breadcrumb: topicLabel }];
  const breadcrumbs = useBreadcrumbs(routes);
  const { search } = useLocation();

  return !breadCrumbs ? (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.slice(1).map(({ breadcrumb, key }, index) =>
        index !== breadcrumbs.length - 2 ? (
          <span key={key}>
            <Link to={`${key}${search}`} className={styles.link}>
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
    // Only used in storybook at the moment, can probobly be removed
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
