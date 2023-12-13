/* eslint-disable jsx-a11y/no-redundant-roles */
import {
  languages as languagesConst,
  languagesOriginal,
} from "common/constants/languages";
import { useDBContext } from "common/hooks/useDBContext";
import { Language, TopicIds } from "common/types/types";
import { LanguageCodeString } from "common/types/LanguageCode";
import { getLanguagePath } from "common/utils/router.utils";
import { FC } from "react";
import { useL10ns, useL10n } from "../../hooks/useL10n";
import { translatedLabel } from "../../utils/language.utils";
import { LanguageSelectorElement } from "../LanguageSelectorElement/LanguageSelectorElement";
import styles from "./LanguageSelector.module.scss";

export type LanguageSelectorProps = {
  currentLanguageCode: string;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
  search: string;
  topicIds: TopicIds;
};

export const LanguageSelector: FC<LanguageSelectorProps> = ({
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

  const languageKeys = languagesConst.map(
    lang => `lang_${lang}`,
  ) as Array<LanguageCodeString>;

  const translations = useL10ns(...languageKeys, "selectLanguage");

  return (
    <nav aria-label={navAriaLabel} className={styles.languageSelectorWrapper}>
      <ul role="list" className={styles.languageSelector}>
        {languages
          ?.filter(language => languagesOriginal?.[language.code])
          ?.sort((a, b) =>
            translatedLabel(a, translations).localeCompare(
              translatedLabel(b, translations),
            ),
          )
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
              translations={translations}
              translatedLabel={translatedLabel(language, translations)}
            />
          ))}
      </ul>
    </nav>
  );
};
