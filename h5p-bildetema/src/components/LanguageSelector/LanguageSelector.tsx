import React from "react";
import styles from "./LanguageSelector.module.scss";
import { Language, TopicIds } from "../../../../common/types/types";
import { getLanguagePath } from "../../../../common/utils/router.utils";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { LanguageSelectorElement } from "../LanguageSelectorElement/LanguageSelectorElement";

export type LanguageSelectorProps = {
  currentLanguageCode: string;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
  isMobile: boolean | null;
  search: string;
  topicIds: TopicIds;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  favLanguages,
  currentLanguageCode,
  handleToggleFavoriteLanguage,
  isMobile,
  search,
  topicIds,
}) => {
  const { topics: topicsFromDB, languages } = useDBContext() || {};

  const getAmountOfRows = (): number => {
    if (isMobile) {
      return Math.max(1, languages ? languages.length : 0);
    }
    return Math.max(1, Math.ceil(languages ? languages.length / 2 : 0));
  };

  return (
    <div className={styles.languageSelectorWrapper}>
      <div
        className={styles.languageSelector}
        style={{
          gridTemplateRows: `repeat(${getAmountOfRows()}, 3rem)`,
          columnGap: "2rem",
        }}
      >
        {languages?.map((language, index) => (
          <LanguageSelectorElement
            path={getLanguagePath(language, topicIds, search, topicsFromDB)}
            key={language.code}
            language={language}
            middleElement={index === Math.max(1, getAmountOfRows() - 1)}
            favLanguages={favLanguages}
            handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
            currentLanguageCode={currentLanguageCode}
          />
        ))}
      </div>
    </div>
  );
};
