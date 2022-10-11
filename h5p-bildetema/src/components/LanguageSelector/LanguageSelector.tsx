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
  search: string;
  topicIds: TopicIds;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  favLanguages,
  currentLanguageCode,
  handleToggleFavoriteLanguage,
  search,
  topicIds,
}) => {
  const { topics: topicsFromDB, languages } = useDBContext() || {};

  const getAmountOfRows = (): number => {
    return Math.max(1, Math.ceil(languages ? languages.length / 2 : 0));
  };

  return (
    <div className={styles.languageSelectorWrapper}>
      <div className={styles.languageSelector}>
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
