/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import styles from "./LanguageSelector.module.scss";
import { Language, TopicIds } from "../../../../common/types/types";
import { getLanguagePath } from "../../../../common/utils/router.utils";
import { useDBContext } from "../../../../common/hooks/useDBContext";
import { LanguageSelectorElement } from "../LanguageSelectorElement/LanguageSelectorElement";
import { useL10n } from "../../hooks/useL10n";
import { filterURL } from "../../utils/url.utils";
import { languagesOriginal } from "../../../../common/constants/languages";

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

  const getAmountOfRows = (columns: number): number => {
    return Math.max(1, Math.ceil(languages ? languages.length / columns : 0));
  };

  const navAriaLabel = useL10n("chooseLanguageAriaLabel");
  const selectLanguageLinkPart1 = useL10n("selectLanguageLinkPart1");
  const selectLanguageLinkPart2 = useL10n("selectLanguageLinkPart2");
  const linkHref = useL10n("footerPrevBildetemaHref");
  const filteredLinkHref = filterURL(linkHref);

  return (
    <nav aria-label={navAriaLabel} className={styles.languageSelectorWrapper}>
      <ul role="list" className={styles.languageSelector}>
        {languages
          ?.filter(language => languagesOriginal?.[language.code])
          ?.map((language, index) => (
            <LanguageSelectorElement
              path={getLanguagePath(language, topicIds, search, topicsFromDB)}
              key={language.code}
              language={language}
              bottomElementAt2Col={
                index === Math.max(1, getAmountOfRows(2) - 1)
              }
              bottomElementAt3Col={
                index === Math.max(1, getAmountOfRows(3) - 1) ||
                index === Math.max(1, getAmountOfRows(3) * 2 - 1)
              }
              favLanguages={favLanguages}
              handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
              currentLanguageCode={currentLanguageCode}
            />
          ))}
      </ul>
      <p>
        {selectLanguageLinkPart1}{" "}
        <a href={filteredLinkHref}>{selectLanguageLinkPart2}</a>
      </p>
    </nav>
  );
};
