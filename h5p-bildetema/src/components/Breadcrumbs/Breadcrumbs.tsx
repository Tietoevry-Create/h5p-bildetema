/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useL10n } from "use-h5p";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { useDBContext } from "common/hooks/useDBContext";
import { LanguageCode } from "common/types/LanguageCode";
import { TopicIds } from "common/types/types";
import { labelToUrlComponent } from "common/utils/string.utils";
import { getLabelFromTranslationRecord } from "../../utils/db.utils";
import {
  BackIcon,
  BreadcrumbsArrowIcon,
  BreadcrumbsArrowLeftIcon,
  HomeIcon,
} from "../Icons/Icons";
import styles from "./Breadcrumbs.module.scss";
import { useSiteLanguage } from "../../hooks/useSiteLanguage";
import { useCurrentLanguage } from "../../hooks/useCurrentLanguage";

export type BreadcrumbsProps = {
  breadCrumbs?: {
    label: string;
    path: string;
  }[];
  currentLanguageCode: LanguageCode;
  topicIds?: TopicIds;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  breadCrumbs,
  currentLanguageCode,
  topicIds,
}) => {
  const lang = useSiteLanguage();
  const currentLang = useCurrentLanguage();
  const { translations, topics } = useDBContext() || {};
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
      const label = ((): string => {
        const urlComponent = `${decodeURIComponent(
          (breadcrumb as React.ReactPortal).props.children,
        )}`;
        if (!topicIds) {
          return urlComponent;
        }

        const { topicId, subTopicId } = topicIds || {};
        const topic = topics?.find(t => t.id === topicId);
        const tLabel = topic?.labelTranslations.get(currentLanguageCode)?.label;

        const isTopicLabel =
          !!tLabel &&
          labelToUrlComponent(tLabel) === labelToUrlComponent(urlComponent);

        if (isTopicLabel) {
          return tLabel;
        }

        const sTopic = topic?.subTopics.find(s => s.id === subTopicId);
        const sLabel =
          sTopic?.labelTranslations.get(currentLanguageCode)?.label;

        const isSubTopicLabel =
          !!sLabel &&
          labelToUrlComponent(sLabel) === labelToUrlComponent(urlComponent);

        if (isSubTopicLabel) {
          return sLabel;
        }
        return urlComponent;
      })();

      return {
        path: `${key}${search}`,
        label,
      };
    });

  const breadcrumbsAriaLabel = useL10n("breadcrumbsAriaLabel");
  const onlyHomePage = breadCrumbsToRender && breadCrumbsToRender.length === 1;

  if (onlyHomePage) {
    const homePageElement = breadCrumbsToRender[0];

    return (
      <div className={styles.breadcrumbs} lang={currentLang}>
        <h1 className={styles.currentPage} key={homePageElement.path}>
          {homePageElement.label}
        </h1>
      </div>
    );
  }

  return (
    <nav aria-label={breadcrumbsAriaLabel}>
      <ol role="list" className={styles.breadcrumbs} lang={currentLang}>
        {breadCrumbsToRender.map(({ label, path }, index) => {
          const notLastBreadCrumb = index !== breadCrumbsToRender.length - 1;
          const homePageBreadCrumb = index === 0;
          const moreThanThreeItems = breadCrumbsToRender.length > 2;

          return notLastBreadCrumb ? (
            <li
              role="listitem"
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
                    <span className={styles.visuallyHidden} lang={lang}>
                      {homeLabel}
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
            <li role="listitem" aria-current="location" key={path}>
              <h1 className={styles.currentPage}>{label}</h1>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
