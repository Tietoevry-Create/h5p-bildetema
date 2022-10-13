import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useL10n } from "use-h5p";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { LanguageCode } from "../../../../common/types/LanguageCode";
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
  rtl: boolean;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadCrumbs,
  currentLanguageCode,
  rtl,
}) => {
  const { translations } = useDBContext() || {};
  const labelFromDb = getLabelFromTranslationRecord(
    translations?.[currentLanguageCode],
  );
  const l10nLabel = useL10n("breadcrumbsTopic");
  const topicLabel = labelFromDb.length > 0 ? labelFromDb : l10nLabel;
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

        return notLastBreadCrumb ? (
          <span
            key={path}
            className={
              homePageBreadCrumb && moreThanThreeItems
                ? styles.wrapperHide
                : styles.wrapper
            }
          >
            <Link to={path} className={styles.link}>
              <span className={styles.arrowLeft}>
                <BreadcrumbsArrowLeftIcon
                  transform={rtl ? "" : "rotate(180)"}
                />
              </span>
              {homePageBreadCrumb ? (
                <span className={styles.homeButton}>
                  <span className={styles.homeIcon}>
                    <HomeIcon />
                  </span>
                  <span className={styles.visuallyHidden}>{homeLabel}</span>
                </span>
              ) : (
                <span className={styles.backButton}>
                  <span className={styles.backIcon}>
                    <BackIcon transform={rtl ? "scale(-1,1)" : ""} />
                  </span>
                  {label}
                </span>
              )}
            </Link>
            <span className={styles.arrow}>
              <BreadcrumbsArrowIcon transform={rtl ? "rotate(180)" : ""} />
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
