import React from "react";
import { useContentId } from "use-h5p";
import { useLocation } from "react-router-dom";
import {
  Language,
  TopicGridSizes,
  TopicIds,
} from "../../../../common/types/types";
import { useL10ns } from "../../hooks/useL10n";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import { Toggle } from "../Toggle/Toggle";
import styles from "./SubHeader.module.scss";
import { PrintButton } from "../PrintButton/PrintButton";
import { LanguageCode } from "../../../../common/types/LanguageCode";

export type SubHeaderProps = {
  topicIds: TopicIds;
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
  showTopicImageView: boolean;
};

export const SubHeader: React.FC<SubHeaderProps> = ({
  topicIds,
  topicsSize,
  setTopicsSize,
  isWordView,
  toggleChecked,
  handleToggleChange,
  showTopicImageView,
}) => {
  const { showWrittenWordsLabel } = useL10ns("showWrittenWordsLabel");

  const contentId = useContentId();
  const { pathname } = useLocation();

  const currentLanguageCode =
    pathname.split("/").length >= 2 ? pathname.split("/")[1] : "nob";

  const renderLeftMenu = (): JSX.Element => {
    const element = isWordView ? (
      <span className={styles.tools}>
        <PrintButton topicIds={topicIds} showWrittenWords={toggleChecked} isWordView={isWordView} showTopicImageView={showTopicImageView}/>
        {!showTopicImageView && (
          <Toggle
            label={showWrittenWordsLabel}
            checked={toggleChecked}
            handleChange={handleToggleChange}
            id={`toggle-${contentId}`}
          />
        )}
      </span>
    ) : (
      <TopicSizeButtons topicsSize={topicsSize} setTopicsSize={setTopicsSize} />
    );

    return element;
  };

  return (
    <div
      className={isWordView ? styles.subHeaderWords : styles.subHeaderThemes}
    >
      <Breadcrumbs currentLanguageCode={currentLanguageCode as LanguageCode} />
      {renderLeftMenu()}
    </div>
  );
};
