import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { languages } from "../../../../common/constants/languages";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { Language, TopicIds } from "../../../../common/types/types";
import { getLanguagePath } from "../../../../common/utils/router.utils";
import { useL10ns } from "../../hooks/useL10n";
import styles from "./LanguageFavorites.module.scss";

export type LanguageFavoritesProps = {
  topicIds: TopicIds;
  favLanguages: Language[];
};

export const LanguageFavorites: React.FC<LanguageFavoritesProps> = ({
  favLanguages,
  topicIds,
}) => {
  const { topics: topicsFromDB } = useDBContext() || {};
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [prevDeltaY, setPrevDeltaY] = useState<number>(0);

  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${LanguageCode}`>;

  const { ...langs } = useL10ns(...languageKeys);

  const { pathname, search } = useLocation();

  const currentLanguageCode: LanguageCode =
    pathname.split("/").length >= 2
      ? (pathname.split("/")[1] as LanguageCode)
      : "nob";

  const scrollHorizontal = (e: React.WheelEvent): void => {
    if (!wrapper.current) {
      return;
    }
    if (e.deltaY !== prevDeltaY) {
      wrapper.current.scrollLeft += e.deltaY;
      setPrevDeltaY(e.deltaY);
    }
  };

  const handleOnMouseEnter = (): void => {
    document.body.style.overflow = "hidden";
  };

  const handleOnMouseLeave = (): void => {
    document.body.style.overflow = "visible";
  };

  return (
    <div
      ref={wrapper}
      className={styles.languageWrapper}
      onWheel={scrollHorizontal}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
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
