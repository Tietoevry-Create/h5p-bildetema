import { useDBContext } from "common/hooks/useDBContext";
import { LanguageCode } from "common/types/LanguageCode";
import { TopicGridSizes, TopicIds } from "common/types/types";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useContentId } from "use-h5p";
import { wordsIncludesArticles } from "common/utils/word.utils";
import { useL10ns } from "../../hooks/useL10n";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { PrintButton } from "../PrintButton/PrintButton";
import { Toggle } from "../Toggle/Toggle";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import styles from "./SubHeader.module.scss";

export type SubHeaderProps = {
  topicIds: TopicIds;
  topicsSize: TopicGridSizes;
  setTopicsSize: Dispatch<SetStateAction<TopicGridSizes>>;
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
  handleToggleArticles: (value: boolean) => void;
  articlesToggleChecked: boolean;
  showTopicImageView: boolean;
  rtl: boolean;
};

export const SubHeader: FC<SubHeaderProps> = ({
  topicIds,
  topicsSize,
  setTopicsSize,
  isWordView,
  toggleChecked,
  handleToggleChange,
  showTopicImageView,
  rtl,
  handleToggleArticles,
  articlesToggleChecked,
}) => {
  const { topics } = useDBContext() || {};
  const { showWrittenWordsLabel } = useL10ns("showWrittenWordsLabel");
  const { showArticlesLabel } = useL10ns("showArticlesLabel");

  const contentId = useContentId();
  const { pathname } = useLocation();

  const currentLanguageCode =
    pathname.split("/").length >= 2 ? pathname.split("/")[1] : "nob";

  const showArticlesToggle = useMemo(() => {
    const { topicId, subTopicId } = topicIds;
    const words = subTopicId
      ? topics
          ?.find(t => t.id === topicId)
          ?.subTopics?.find(s => s.id === subTopicId)
          ?.words?.get(currentLanguageCode as LanguageCode)
      : topics
          ?.find(t => t.id === topicId)
          ?.words?.get(currentLanguageCode as LanguageCode);
    if (!words) return false;
    return wordsIncludesArticles(words);
  }, [currentLanguageCode, topicIds, topics]);

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
            topicIds={topicIds}
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
        topicIds={topicIds}
      />
      {renderLeftMenu()}
    </div>
  );
};
