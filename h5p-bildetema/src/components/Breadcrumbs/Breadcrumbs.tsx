import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useL10n } from "use-h5p";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {
  BreadcrumbsArrowIcon,
  BreadcrumbsArrowLeftIcon,
  HomeIcon,
} from "../Icons/Icons";
import styles from "./Breadcrumbs.module.scss";

export type BreadcrumbsProps = {
  breadCrumbs?: {
    label: string;
    path: string;
  }[];
  currentLanguageCode: string;
  isMobile: boolean | null;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadCrumbs,
  currentLanguageCode,
  isMobile,
}) => {
  const topicLabel = useL10n("breadcrumbsTopic");
  const homeLabel = useL10n("breadcrumbsHome");
  const routes = [{ path: `/${currentLanguageCode}`, breadcrumb: topicLabel }];
  const routeBreadCrumbs = useBreadcrumbs(routes);
  const { search } = useLocation();

  const breadCrumbsToRender =
    breadCrumbs ??
    routeBreadCrumbs.slice(1).map(({ breadcrumb, key }) => {
      return {
        path: `${key}${search}`,
        label: `${decodeURIComponent(
          (breadcrumb as React.ReactPortal).props.children,
        )}`,
      };
    });

  return (
    <div className={styles.breadcrumbs}>
      {breadCrumbsToRender.map(({ label, path }, index) => {
        const notLastBreadCrumb = index !== breadCrumbsToRender.length - 1;
        const homePageBreadCrumb = index === 0;
        const moreThanThreeItems = breadCrumbsToRender.length > 2;

        if (isMobile) {
          if (homePageBreadCrumb && moreThanThreeItems) {
            return null;
          }
          return notLastBreadCrumb ? (
            <span key={path}>
              <Link to={path} className={styles.linkMobile}>
                <BreadcrumbsArrowLeftIcon />
                {homePageBreadCrumb ? (
                  <span className={styles.homeIcon}>
                    <HomeIcon />
                    <span className={styles.visuallyHidden}>{homeLabel}</span>
                  </span>
                ) : (
                  label
                )}
              </Link>
            </span>
          ) : (
            <h1 className={styles.currentPage} key={path}>
              {label}
            </h1>
          );
        }

        return notLastBreadCrumb ? (
          <span key={path}>
            <Link to={path} className={styles.link}>
              {homePageBreadCrumb ? (
                <span className={styles.homeIcon}>
                  <HomeIcon />
                  <span className={styles.visuallyHidden}>{homeLabel}</span>
                </span>
              ) : (
                label
              )}
            </Link>
            <span className={styles.arrow}>
              <BreadcrumbsArrowIcon />
            </span>
          </span>
        ) : (
          <h1 className={styles.currentPage} key={path}>
            {label}
          </h1>
        );
      })}
    </div>
  );
};
