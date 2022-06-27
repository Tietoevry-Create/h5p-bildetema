import React from "react";
import { useContentId } from "use-h5p";
import { TopicGridSizes } from "../../../../common/types/types";
import { languages } from "../../constants/languages";
import { useL10n } from "../../hooks/useL10n";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import { Toggle, Breadcrumbs } from "..";
import styles from "./Header.module.scss";

export type HeaderProps = {
  currentLanguageCode: string;
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
};

export const Header: React.FC<HeaderProps> = ({
  currentLanguageCode,
  topicsSize,
  setTopicsSize,
  isWordView,
  toggleChecked,
  handleToggleChange,
}) => {
  const languageKeys = languages.map(
    lang => `lang_${lang}`,
  ) as Array<`lang_${typeof languages[number]}`>;
  const translations = useL10n(...languageKeys, "selectLanguage");
  const toggleLabel = useL10n("showWrittenWordsLabel")
  

  const contentId = useContentId();

  const renderLeftMenu = (): JSX.Element => {
    const element = isWordView ? (
      <span className={styles.toggle}>
        <Toggle
          label={toggleLabel}
          checked={toggleChecked}
          handleChange={handleToggleChange}
          id={`toggle-${contentId}`}
        />
      </span>
    ) : (
      <TopicSizeButtons topicsSize={topicsSize} setTopicsSize={setTopicsSize} />
    );

    return element;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>{/* TODO: Add logo as SVG */}</div>
        <div className={styles.language_container}>
          <div>{translations.selectLanguage}</div>
          <div className={styles.languages}>
            <p>{translations.lang_eng}</p>
            <p>{translations.lang_nob}</p>
            <p>{translations.lang_non}</p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Breadcrumbs currentLanguageCode={currentLanguageCode} />
        {renderLeftMenu()}
      </div>
    </div>
  );
};
