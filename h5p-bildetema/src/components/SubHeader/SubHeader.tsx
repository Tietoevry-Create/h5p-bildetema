import { LanguageCode } from "common/types/LanguageCode";
import { CurrentTopics, TopicGridSizes } from "common/types/types";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useContentId } from "use-h5p";
import { useL10ns } from "../../hooks/useL10n";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { PrintButton } from "../PrintButton/PrintButton";
import { Toggle } from "../Toggle/Toggle";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import styles from "./SubHeader.module.scss";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";
import { useSearchParamContext } from "../../hooks/useSearchParamContext";

export type SubHeaderProps = {
  topicsSize?: TopicGridSizes;
  setTopicsSize?: Dispatch<SetStateAction<TopicGridSizes>>;
  currentTopics?: CurrentTopics;
  breadCrumbs?: {
    label: string;
    path: string;
  }[];
  showTopicImageView?: boolean;
  rtl: boolean;
  isWordView: boolean;
  showArticlesToggle: boolean;
};

export const SubHeader: FC<SubHeaderProps> = ({
  topicsSize,
  setTopicsSize,
  currentTopics,
  isWordView,
  showTopicImageView = false,
  rtl,
  showArticlesToggle,
  breadCrumbs,
}) => {
  const { showWrittenWordsLabel } = useL10ns("showWrittenWordsLabel");
  const { showArticlesLabel } = useL10ns("showArticlesLabel");
  const currentLanguageCode = useCurrentLanguageCode();

  const {
    showArticles,
    showWrittenWords,
    handleShowArticlesChange,
    handleShowWrittenWordsChange,
    syncStateWithParams,
  } = useSearchParamContext();

  const contentId = useContentId();

  useEffect(() => {
    if (isWordView) {
      syncStateWithParams();
    }
  }, [isWordView, syncStateWithParams]);

  const showTopicSizeButtons =
    topicsSize !== undefined && setTopicsSize !== undefined;

  const renderRightMenu = (): JSX.Element => {
    return (
      <div className={styles.tools}>
        {isWordView ? (
          <>
            <PrintButton
              showWrittenWords={showWrittenWords}
              isWordView={isWordView}
              showTopicImageView={showTopicImageView}
              showArticles={showArticles && showArticlesToggle}
            />
            <Toggle
              label={showWrittenWordsLabel}
              checked={showWrittenWords}
              handleChange={handleShowWrittenWordsChange}
              id={`toggle-${contentId}`}
            />
            {showArticlesToggle && (
              <Toggle
                label={showArticlesLabel}
                checked={showArticles}
                handleChange={handleShowArticlesChange}
                id={`toggle-articles-${contentId}`}
              />
            )}
          </>
        ) : null}

        {showTopicSizeButtons && !isWordView ? (
          <TopicSizeButtons
            topicsSize={topicsSize}
            setTopicsSize={setTopicsSize}
          />
        ) : null}
      </div>
    );
  };

  return (
    <div
      className={`${
        isWordView ? styles.subHeaderWords : styles.subHeaderThemes
      } ${rtl ? styles.rtl : ""}`}
    >
      <Breadcrumbs
        currentLanguageCode={currentLanguageCode as LanguageCode}
        currentTopics={currentTopics}
        breadCrumbs={breadCrumbs}
      />
      {renderRightMenu()}
    </div>
  );
};
