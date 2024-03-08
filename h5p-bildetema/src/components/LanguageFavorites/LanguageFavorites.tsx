/* eslint-disable jsx-a11y/no-redundant-roles */
import { languages as languagesConst } from "common/constants/languages";
import { LanguageCodeString, LanguageCode } from "common/types/LanguageCode";
import { CurrentTopics, Language } from "common/types/types";
import { getPath } from "common/utils/router.utils";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { sanitizeLanguages, translatedLabel } from "../../utils/language.utils";
import { useL10n, useL10ns } from "../../hooks/useL10n";
import styles from "./LanguageFavorites.module.scss";

export type LanguageFavoritesProps = {
  favLanguages: Language[];
  hidden: boolean;
  currentTopics: CurrentTopics;
};

export const LanguageFavorites: FC<LanguageFavoritesProps> = ({
  favLanguages,
  hidden,
  currentTopics,
}) => {
  const { languages: languagesFromDB } = useNewDBContext();
  const languageKeys = languagesConst.map(
    lang => `lang_${lang}`,
  ) as Array<LanguageCodeString>;

  const { ...langs } = useL10ns(...languageKeys);

  const { pathname, search } = useLocation();

  const currentLanguageCode: LanguageCode =
    pathname.split("/").length >= 2
      ? (pathname.split("/")[1] as LanguageCode)
      : "nob";

  const navAriaLabel = useL10n("favoriteLanguagesAriaLabel");

  const sanitizedFavLanguages = sanitizeLanguages(
    favLanguages,
    languagesFromDB,
  );

  return (
    <nav
      aria-label={navAriaLabel}
      className={hidden ? styles.hidden : styles.languageWrapper}
    >
      <ul role="list" className={styles.languages}>
        {sanitizedFavLanguages
          .sort(
            (a, b) =>
              translatedLabel(a, langs)?.localeCompare(
                translatedLabel(b, langs),
              ),
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
                  to={getPath({ language, search, currentTopics })}
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
