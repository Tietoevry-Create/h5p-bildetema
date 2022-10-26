import React from "react";
import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { useTranslation } from "../../hooks/useTranslation";
import { getLabelFromTranslationRecord } from "../../utils/db.utils";
import {
  BackIcon,
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
  currentLanguageCode: LanguageCode;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadCrumbs,
  currentLanguageCode,
}) => {
  const { t } = useTranslation();
  const { translations } = useDBContext() || {};
  const labelFromDb = getLabelFromTranslationRecord(
    translations?.[currentLanguageCode],
  );
  const topicLabel =
    labelFromDb.length > 0 ? labelFromDb : t("breadcrumbsTopic");
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

  const AriaBreadcrumbsNav = "breadcrumbs"; // TODO: translate
  const onlyHomePage = breadCrumbsToRender && breadCrumbsToRender.length === 1;

  if (onlyHomePage) {
    const homePageElement = breadCrumbsToRender[0];

    return (
      <div className={styles.breadcrumbs}>
        <h1 className={styles.currentPage} key={homePageElement.path}>
          {homePageElement.label}
        </h1>
      </div>
    );
  }

  return (
    <nav aria-label={AriaBreadcrumbsNav}>
      <ol className={styles.breadcrumbs}>
        {breadCrumbsToRender.map(({ label, path }, index) => {
          const notLastBreadCrumb = index !== breadCrumbsToRender.length - 1;
          const homePageBreadCrumb = index === 0;
          const moreThanThreeItems = breadCrumbsToRender.length > 2;

          return notLastBreadCrumb ? (
            <li
              key={path}
              className={
                homePageBreadCrumb && moreThanThreeItems
                  ? styles.wrapperHide
                  : styles.wrapper
              }
            >
              <Link to={path} className={styles.link}>
                <span className={styles.arrowLeft} aria-hidden="true">
                  <BreadcrumbsArrowLeftIcon />
                </span>
                {homePageBreadCrumb ? (
                  <span className={styles.homeButton}>
                    <span className={styles.homeIcon}>
                      <HomeIcon />
                    </span>
                    <span className={styles.visuallyHidden}>
                      {t("breadcrumbsHome")}
                    </span>
                  </span>
                ) : (
                  <span className={styles.backButton}>
                    <span className={styles.backIcon} aria-hidden="true">
                      <BackIcon />
                    </span>
                    {label}
                  </span>
                )}
              </Link>
              <span className={styles.arrow} aria-hidden="true">
                <BreadcrumbsArrowIcon />
              </span>
            </li>
          ) : (
            <li aria-current="page">
              <h1 className={styles.currentPage} key={path}>
                {label}
              </h1>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
