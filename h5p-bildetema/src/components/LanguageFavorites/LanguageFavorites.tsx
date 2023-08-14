/* eslint-disable jsx-a11y/no-redundant-roles */
import { languages as languagesConst } from "common/constants/languages";
import { useDBContext } from "common/hooks/useDBContext";
import { LanguageCode } from "common/types/LanguageCode";
import { Language, TopicIds } from "common/types/types";
import { getLanguagePath } from "common/utils/router.utils";
import { translatedLabel } from "../../utils/language.utils";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useL10n, useL10ns } from "../../hooks/useL10n";
import styles from "./LanguageFavorites.module.scss";

export type LanguageFavoritesProps = {
  topicIds: TopicIds;
  favLanguages: Language[];
};

export const LanguageFavorites: FC<LanguageFavoritesProps> = ({
  favLanguages,
  topicIds,
}) => {
  const { topics: topicsFromDB } = useDBContext() || {};
  const languageKeys = languagesConst.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${LanguageCode}`>;

  const { ...langs } = useL10ns(...languageKeys);

  const { pathname, search } = useLocation();

  const currentLanguageCode: LanguageCode =
    pathname.split("/").length >= 2
      ? (pathname.split("/")[1] as LanguageCode)
      : "nob";

  const navAriaLabel = useL10n("favoriteLanguagesAriaLabel");

  return (
    <nav aria-label={navAriaLabel} className={styles.languageWrapper}>
      <ul role="list" className={styles.languages}>
        {favLanguages
          .sort((a, b) =>
            translatedLabel(a, langs).localeCompare(translatedLabel(b, langs)),
          )
          .map(language => {
            return (
              <li
                role="listitem"
                key={language.code}
                aria-current={
                  currentLanguageCode === language.code ? "page" : undefined
                }
              >
                <Link
                  to={getLanguagePath(language, topicIds, search, topicsFromDB)}
                  className={`${styles.languageButton} ${
                    currentLanguageCode === language.code
                      ? styles.languageButton_active
                      : ""
                  }`}
                >
                  {translatedLabel(language, langs)}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};
