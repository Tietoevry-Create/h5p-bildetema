/* eslint-disable jsx-a11y/no-redundant-roles */
import { LanguageCode } from "common/types/LanguageCode";
import { CurrentTopics } from "common/types/types";
import { labelToUrlComponent } from "common/utils/string.utils";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { STATIC_PATH } from "common/constants/paths";
import {
  BackIcon,
  BreadcrumbsArrowIcon,
  BreadcrumbsArrowLeftIcon,
  HomeIcon,
} from "common/components/Icons/Icons";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { useL10n } from "../../hooks/useL10n";
import { useCurrentLanguageAttribute } from "../../hooks/useCurrentLanguage";
import { useSiteLanguageString } from "../../hooks/useSiteLanguage";
import { getLabelFromTranslationRecord } from "../../utils/db.utils";
import styles from "./Breadcrumbs.module.scss";

type RouteBreadCrumb = {
  props: {
    children: string;
  };
};

export type BreadcrumbsProps = {
  breadCrumbs?: {
    label: string;
    path: string;
  }[];
  currentLanguageCode: LanguageCode;
  currentTopics?: CurrentTopics;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  breadCrumbs,
  currentLanguageCode,
  currentTopics,
}) => {
  const { pathname } = useLocation();
  const lang = useSiteLanguageString();
  const currentLangAttribute = useCurrentLanguageAttribute();
  const currentLang =
    pathname.startsWith(STATIC_PATH.COLLECTIONS) ||
    pathname.startsWith(STATIC_PATH.SEARCH)
      ? lang
      : currentLangAttribute;
  const { translations } = useNewDBContext();
  const labelFromDb = getLabelFromTranslationRecord(
    currentLanguageCode,
    translations?.get("F001"),
  );

  const l10nLabel = useL10n("breadcrumbsTopic");
  const topicLabel = labelFromDb.length > 0 ? labelFromDb : l10nLabel;
  const homeLabel = useL10n("breadcrumbsHome");
  const routes = [{ path: `/${currentLanguageCode}`, breadcrumb: topicLabel }];
  const routeBreadCrumbs = useBreadcrumbs(routes);

  const breadCrumbsToRender =
    breadCrumbs ??
    routeBreadCrumbs.slice(1).map(({ breadcrumb, key }) => {
      const label = ((): string => {
        const urlComponent = `${decodeURIComponent(
          (breadcrumb as RouteBreadCrumb).props.children,
        )}`;
        if (!currentTopics) {
          return urlComponent;
        }
        const { topic, subTopic } = currentTopics;
        const tLabel = topic?.translations
          .get(currentLanguageCode)
          ?.labels.at(0)?.label;

        const isTopicLabel =
          !!tLabel &&
          labelToUrlComponent(tLabel) === labelToUrlComponent(urlComponent);
        if (isTopicLabel) {
          return tLabel;
        }

        const sLabel = subTopic?.translations
          .get(currentLanguageCode)
          ?.labels.at(0)?.label;

        const isSubTopicLabel =
          !!sLabel &&
          labelToUrlComponent(sLabel) === labelToUrlComponent(urlComponent);

        if (isSubTopicLabel) {
          return sLabel;
        }

        return urlComponent;
      })();

      return {
        path: `${key}`,
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
                    <span className={styles.homeIcon} aria-hidden="true">
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
