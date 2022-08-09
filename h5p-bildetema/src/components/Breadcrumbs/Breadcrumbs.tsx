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
  const routeBreadCrumbs = useBreadcrumbs(routes);
  const { search } = useLocation();
  

  const breadCrumbsToRender = breadCrumbs ?? routeBreadCrumbs.slice(1).map(({ breadcrumb, key }) => {
    return {path: `${key}${search}`, label:`${decodeURIComponent(((breadcrumb as React.ReactPortal).props.children))}`}
  })

  return (
  <div className={styles.breadcrumbs}>
    {breadCrumbsToRender.map(({ label, path }, index) =>
      index !== breadCrumbsToRender.length - 1 ? (
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
  )
};
