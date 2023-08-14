/* eslint-disable jsx-a11y/no-redundant-roles */
import {
  languages as languagesConst,
  languagesOriginal,
} from "common/constants/languages";
import { useDBContext } from "common/hooks/useDBContext";
import { Language, TopicIds } from "common/types/types";
import { LanguageCode } from "common/types/LanguageCode";
import { getLanguagePath } from "common/utils/router.utils";
import { FC } from "react";
import { useL10ns } from "use-h5p";
import { useL10n } from "../../hooks/useL10n";
import { filterURL } from "../../utils/url.utils";
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

  const getAmountOfRows = (): number => {
    return Math.max(1, Math.ceil(languages ? languages.length / 2 : 0));
  };

  const navAriaLabel = useL10n("chooseLanguageAriaLabel");
  const selectLanguageLinkPart1 = useL10n("selectLanguageLinkPart1");
  const selectLanguageLinkPart2 = useL10n("selectLanguageLinkPart2");
  const linkHref = useL10n("footerPrevBildetemaHref");
  const filteredLinkHref = filterURL(linkHref);

  const languageKeys = languagesConst.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${LanguageCode}`>;

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
              middleElement={index === Math.max(1, getAmountOfRows() - 1)}
              favLanguages={favLanguages}
              handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
              currentLanguageCode={currentLanguageCode}
              translations={translations}
              translatedLabel={translatedLabel(language, translations)}
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
