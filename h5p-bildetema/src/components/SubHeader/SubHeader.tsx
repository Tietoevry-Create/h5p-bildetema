import React from "react";
import { useLocation } from "react-router-dom";
import { useContentId } from "use-h5p";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { TopicGridSizes, TopicIds } from "../../../../common/types/types";
import { useTranslation } from "../../hooks/useTranslation";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { PrintButton } from "../PrintButton/PrintButton";
import { Toggle } from "../Toggle/Toggle";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import styles from "./SubHeader.module.scss";

export type SubHeaderProps = {
  topicIds: TopicIds;
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
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
}) => {
  const { t } = useTranslation();

  const contentId = useContentId();
  const { pathname } = useLocation();

  const currentLanguageCode =
    pathname.split("/").length >= 2 ? pathname.split("/")[1] : "nob";

  const renderLeftMenu = (): JSX.Element => {
    const element = isWordView ? (
      !showTopicImageView && (
        <Toggle
          label={t("showWrittenWordsLabel")}
          checked={toggleChecked}
          handleChange={handleToggleChange}
          id={`toggle-${contentId}`}
        />
      )
    ) : (
      <TopicSizeButtons topicsSize={topicsSize} setTopicsSize={setTopicsSize} />
    );

    return (
      <span className={styles.tools}>
        <PrintButton
          topicIds={topicIds}
          showWrittenWords={toggleChecked}
          isWordView={isWordView}
          showTopicImageView={showTopicImageView}
        />
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
      <Breadcrumbs currentLanguageCode={currentLanguageCode as LanguageCode} />
      {renderLeftMenu()}
    </div>
  );
};
