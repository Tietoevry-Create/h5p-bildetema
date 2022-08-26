import React from "react";
import { Link, useLocation } from "react-router-dom";
import { languages } from "../../../../common/constants/languages";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { Language, Topic, TopicIds } from "../../../../common/types/types";
import { getLanguagePath } from "../../../../common/utils/router.utils";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./LanguageFavorites.module.scss";

export type LanguageFavoritesProps = {
  topicsFromDB?: Topic[];
  topicIds: TopicIds;
  favLanguages: Language[];
};

export const LanguageFavorites: React.FC<LanguageFavoritesProps> = ({
  favLanguages,
  topicIds,
  topicsFromDB,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${LanguageCode}`>;

  const { ...langs } = useL10ns(...languageKeys);

  const { pathname, search } = useLocation();

  const currentLanguageCode: LanguageCode =
    pathname.split("/").length >= 2
      ? (pathname.split("/")[1] as LanguageCode)
      : "nob";

  return (
    <div className={styles.languageWrapper}>
      <div className={styles.languages}>
        {favLanguages.map(language => {
          return (
            <Link
              key={language.code}
              to={getLanguagePath(language, topicIds, search, topicsFromDB)}
              className={`${styles.languageButton} ${
                currentLanguageCode === language.code
                  ? styles.languageButton_active
                  : ""
              }`}
            >
              {langs[`lang_${language.code}`]}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
