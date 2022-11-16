import React from "react";
import { useContentId } from "use-h5p";
import { useLocation } from "react-router-dom";
import { TopicGridSizes, TopicIds } from "../../../../common/types/types";
import { useL10ns } from "../../hooks/useL10n";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import { Toggle } from "../Toggle/Toggle";
import styles from "./SubHeader.module.scss";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { useDBContext } from "../../../../common/hooks/useDBContext";

export type SubHeaderProps = {
  topicIds: TopicIds;
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
  handleToggleArticles: (value: boolean) => void;
  articlesToggleChecked: boolean;
  showTopicImageView: boolean;
  rtl: boolean;
};

export const SubHeader: React.FC<SubHeaderProps> = ({
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

  const showArticlesToggle = React.useMemo(() => {
    const { topicId, subTopicId } = topicIds;
    const words = subTopicId
      ? topics
          ?.find(t => t.id === topicId)
          ?.subTopics?.find(s => s.id === subTopicId)
          ?.words?.get(currentLanguageCode as LanguageCode)
      : topics
          ?.find(t => t.id === topicId)
          ?.words?.get(currentLanguageCode as LanguageCode);
    return !!words?.find(word => {
      if (word?.article) return true;
      return false;
    });
  }, [currentLanguageCode, topicIds, topics]);

  const renderLeftMenu = (): JSX.Element => {
    const element = isWordView ? (
      // TODO: might be removed if toggles should be visible in topic view
      // !showTopicImageView && (
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
      // ) : (
      <TopicSizeButtons topicsSize={topicsSize} setTopicsSize={setTopicsSize} />
    );

    return <span className={styles.tools}>{element}</span>;
  };

  return (
    <div
      className={`${
        isWordView ? styles.subHeaderWords : styles.subHeaderThemes
      } ${rtl ? styles.rtl : ""}`}
    >
      <Breadcrumbs currentLanguageCode={currentLanguageCode as LanguageCode} />
      {renderLeftMenu()}
    </div>
  );
};
