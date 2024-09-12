import {
  LanguageIcon,
  LanguageMenuArrowIcon,
} from "common/components/Icons/Icons";
import { CurrentTopics, Language } from "common/types/types";
import {
  Dispatch,
  FC,
  FocusEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import styles from "./LanguageDropdown.module.scss";

export type LanguageDropdownProps = {
  handleSelectorVisibility: Dispatch<SetStateAction<boolean>>;
  langSelectorIsShown: boolean | undefined;
  selectLanguageLabel: string;
  favLanguages: Language[];
  handleToggleFavoriteLanguage: (language: Language, favorite: boolean) => void;
  currentLanguageCode: string;
  search: string;
  firstTime: boolean;
  currentTopics: CurrentTopics;
};

export const LanguageDropdown: FC<LanguageDropdownProps> = ({
  handleSelectorVisibility,
  langSelectorIsShown,
  selectLanguageLabel,
  favLanguages,
  handleToggleFavoriteLanguage,
  currentLanguageCode,
  search,
  firstTime,
  currentTopics,
}) => {
  const [isActive, setIsActive] = useState(langSelectorIsShown);

  const handleOnClickOutside = (): void => {
    handleSelectorVisibility(false);
    setIsActive(false);
  };

  const dropdownRef = useDetectClickOutside({
    onTriggered: handleOnClickOutside,
  });

  const handleOnClick = (): void => {
    handleSelectorVisibility(prevState => !prevState);
    setIsActive(!isActive);
  };

  const handleOnBlur = (e: FocusEvent<HTMLElement, Element>): void => {
    const { currentTarget } = e;

    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        handleSelectorVisibility(false);
        setIsActive(false);
      }
    });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only set `firstTime` when `currentLanguageCode` changes
  useEffect(() => {
    setIsActive(firstTime);
  }, [currentLanguageCode]);

  return (
    <div
      className={styles.languageMenuButtonWrapper}
      ref={dropdownRef}
      onBlur={e => handleOnBlur(e)}
    >
      <button
        type="button"
        onClick={handleOnClick}
        aria-label={selectLanguageLabel}
        className={
          isActive ? styles.languageMenuButtonActive : styles.languageMenuButton
        }
      >
        <span className={styles.languageIcon} aria-hidden="true">
          <LanguageIcon />
        </span>
        <span className={styles.languageLabel}>{selectLanguageLabel}</span>
        <span className={styles.arrowIcon} aria-hidden="true">
          <LanguageMenuArrowIcon
            transform={isActive ? "scale(0.9) rotate(180)" : "scale(0.9)"}
            transformOrigin="50% 50%"
          />
        </span>
      </button>
      {isActive && (
        <LanguageSelector
          search={search}
          currentLanguageCode={currentLanguageCode}
          favLanguages={favLanguages}
          handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
          currentTopics={currentTopics}
        />
      )}
    </div>
  );
};
