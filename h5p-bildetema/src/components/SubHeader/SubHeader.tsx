import { LanguageCode } from "common/types/LanguageCode";
import { CurrentTopics, TopicGridSizes } from "common/types/types";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { useContentId } from "use-h5p";
import { newWordsIncludesArticles } from "common/utils/word.utils";
import { useNewDBContext } from "common/hooks/useNewDBContext";
import { getNewWordsFromId } from "common/utils/data.utils";
import { useL10ns } from "../../hooks/useL10n";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { PrintButton } from "../PrintButton/PrintButton";
import { Toggle } from "../Toggle/Toggle";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import styles from "./SubHeader.module.scss";
import { useCurrentLanguageCode } from "../../hooks/useCurrentLanguage";

export type SubHeaderProps = {
  topicsSize: TopicGridSizes;
  setTopicsSize: Dispatch<SetStateAction<TopicGridSizes>>;
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
  handleToggleArticles: (value: boolean) => void;
  articlesToggleChecked: boolean;
  showTopicImageView: boolean;
  rtl: boolean;
  currentTopics: CurrentTopics;
};

export const SubHeader: FC<SubHeaderProps> = ({
  topicsSize,
  setTopicsSize,
  isWordView,
  toggleChecked,
  handleToggleChange,
  showTopicImageView,
  rtl,
  handleToggleArticles,
  articlesToggleChecked,
  currentTopics,
}) => {
  const { idToContent, idToWords } = useNewDBContext();
  const { showWrittenWordsLabel } = useL10ns("showWrittenWordsLabel");
  const { showArticlesLabel } = useL10ns("showArticlesLabel");

  const contentId = useContentId();

  const currentLanguageCode = useCurrentLanguageCode();

  const showArticlesToggle = useMemo(() => {
    const { topic, subTopic } = currentTopics;
    if (subTopic) {
      const words = getNewWordsFromId(subTopic.id, idToWords, idToContent);
      return newWordsIncludesArticles(words, currentLanguageCode);
    }
    if (topic) {
      const words = getNewWordsFromId(topic.id, idToWords, idToContent);
      return newWordsIncludesArticles(words, currentLanguageCode);
    }
    return false;
  }, [currentLanguageCode, currentTopics, idToContent, idToWords]);

  const renderLeftMenu = (): JSX.Element => {
    const element = isWordView ? (
      <>
        <Toggle
          label={showWrittenWordsLabel}
          checked={toggleChecked}
          handleChange={handleToggleChange}
          id={`toggle-${contentId}`}
        />
        {showArticlesToggle && (
          <Toggle
            label={showArticlesLabel}
            checked={articlesToggleChecked}
            handleChange={handleToggleArticles}
            id={`toggle-articles-${contentId}`}
          />
        )}
      </>
    ) : (
      <TopicSizeButtons topicsSize={topicsSize} setTopicsSize={setTopicsSize} />
    );

    return (
      <span className={styles.tools}>
        {isWordView && (
          <PrintButton
            showWrittenWords={toggleChecked}
            isWordView={isWordView}
            showTopicImageView={showTopicImageView}
            showArticles={articlesToggleChecked && showArticlesToggle}
          />
        )}
        {element}
      </span>
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
      />
      {renderLeftMenu()}
    </div>
  );
};
