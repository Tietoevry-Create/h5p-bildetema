/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { Language, TopicIds } from "../../../../common/types/types";
import { getLanguagePath } from "../../../../common/utils/router.utils";
import styles from "./LanguageFavorites.module.scss";

export type LanguageFavoritesProps = {
  topicIds: TopicIds;
  favLanguages: Language[];
};

export const LanguageFavorites: React.FC<LanguageFavoritesProps> = ({
  favLanguages,
  topicIds,
}) => {
  const { t } = useTranslation();
  const { topics: topicsFromDB } = useDBContext() || {};

  const { pathname, search } = useLocation();

  const currentLanguageCode: LanguageCode =
    pathname.split("/").length >= 2
      ? (pathname.split("/")[1] as LanguageCode)
      : "nob";

  const navAriaLabel = "Favorite languages"; // TODO: translate

  return (
    <nav aria-label={navAriaLabel} className={styles.languageWrapper}>
      <ul role="list" className={styles.languages}>
        {favLanguages.map(language => {
          return (
            <li role="listitem">
              <Link
                key={language.code}
                to={getLanguagePath(language, topicIds, search, topicsFromDB)}
                className={`${styles.languageButton} ${
                  currentLanguageCode === language.code
                    ? styles.languageButton_active
                    : ""
                }`}
              >
                {t(`lang_${language.code}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
