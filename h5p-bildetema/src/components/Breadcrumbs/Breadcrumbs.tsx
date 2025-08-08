/* eslint-disable jsx-a11y/no-redundant-roles */
import { LanguageCode, LanguageCodeString } from "common/types/LanguageCode";
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
import { Helmet } from "react-helmet";
import { languages as languagesConst } from "common/constants/languages";
import { useL10n, useL10ns } from "../../hooks/useL10n";
import { useCurrentLanguageAttribute } from "../../hooks/useCurrentLanguage";
import {
  useSiteLanguage,
  useSiteLanguageString,
} from "../../hooks/useSiteLanguage";
import { getLabelFromTranslationRecord } from "../../utils/db.utils";
import styles from "./Breadcrumbs.module.scss";
import { translatedLabel } from "../../utils/language.utils";

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
  const siteLanguage = useSiteLanguage();
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

  const { headerTitle } = useL10ns("headerTitle");
  const l10nLabel = useL10n("breadcrumbsTopic");
  const topicLabel = labelFromDb.length > 0 ? labelFromDb : l10nLabel;
  const homeLabel = useL10n("breadcrumbsHome");
  const routes = [{ path: `/${currentLanguageCode}`, breadcrumb: topicLabel }];
  const routeBreadCrumbs = useBreadcrumbs(routes);

  const languageKeys = languagesConst.map(
    langconst => `lang_${langconst}`,
  ) as Array<LanguageCodeString>;

  const { ...langs } = useL10ns(...languageKeys);

  const currentLanguage = translatedLabel(currentLanguageCode, langs);

  const isOnSiteLanguage = currentLanguageCode === siteLanguage.code;

  const breadCrumbsToRender = breadCrumbs
    ? breadCrumbs.map(({ label, path }) => ({
        label,
        path,
        labelOnSiteLanguage: undefined,
      }))
    : routeBreadCrumbs.slice(1).map(({ breadcrumb, key }) => {
        let labelOnSiteLanguage: string | undefined;

        const label = ((): string => {
          const urlComponent = `${decodeURIComponent(
            (breadcrumb as RouteBreadCrumb).props.children,
          )}`;
          if (!currentTopics) {
            labelOnSiteLanguage = urlComponent;
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
            labelOnSiteLanguage = topic?.translations
              .get(siteLanguage.code)
              ?.labels.at(0)?.label;
            return tLabel;
          }

          const sLabel = subTopic?.translations
            .get(currentLanguageCode)
            ?.labels.at(0)?.label;

          const isSubTopicLabel =
            !!sLabel &&
            labelToUrlComponent(sLabel) === labelToUrlComponent(urlComponent);

          if (isSubTopicLabel) {
            labelOnSiteLanguage = subTopic?.translations
              .get(siteLanguage.code)
              ?.labels.at(0)?.label;
            return sLabel;
          }

          labelOnSiteLanguage = urlComponent;
          return urlComponent;
        })();

        return {
          path: `${key}`,
          label,
          labelOnSiteLanguage,
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
        {breadCrumbsToRender.map(
          ({ label, path, labelOnSiteLanguage }, index) => {
            const notLastBreadCrumb = index !== breadCrumbsToRender.length - 1;
            const homePageBreadCrumb = index === 0;
            const moreThanThreeItems = breadCrumbsToRender.length > 2;

            const fullLabel =
              isOnSiteLanguage || !labelOnSiteLanguage
                ? label
                : `${labelOnSiteLanguage} // ${label} (${currentLanguage})`;

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
                <Helmet>
                  <title>{`${fullLabel} – ${headerTitle}`}</title>
                </Helmet>
              </li>
            );
          },
        )}
      </ol>
    </nav>
  );
};
