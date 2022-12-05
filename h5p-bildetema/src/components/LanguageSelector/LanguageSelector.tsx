/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import styles from "./LanguageSelector.module.scss";
import { Language, TopicIds } from "../../../../common/types/types";
import { getLanguagePath } from "../../../../common/utils/router.utils";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { LanguageSelectorElement } from "../LanguageSelectorElement/LanguageSelectorElement";
import { useL10n } from "../../hooks/useL10n";

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

  const navAriaLabel = "Choose language"; // TODO: translate
  const selectLanguageLinkPart1 = useL10n("selectLanguageLinkPart1");
  const selectLanguageLinkPart2 = useL10n("selectLanguageLinkPart2");
  const linkHref = useL10n("footerPrevBildetemaHref");

  return (
    <nav aria-label={navAriaLabel} className={styles.languageSelectorWrapper}>
      <ul role="list" className={styles.languageSelector}>
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
      </ul>
      <p>
        {selectLanguageLinkPart1}{" "}
        <a href={linkHref}>{selectLanguageLinkPart2}</a>
      </p>
    </nav>
  );
};
