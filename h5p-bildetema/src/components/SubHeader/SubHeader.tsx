import React from "react";
import { useContentId } from "use-h5p";
import { useLocation } from "react-router-dom";
import { TopicGridSizes } from "../../../../common/types/types";
import { useL10ns } from "../../hooks/useL10n";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import { Toggle } from "../Toggle/Toggle";
import styles from "./SubHeader.module.scss";
import { PrintButton } from "../PrintButton/PrintButton";

export type SubHeaderProps = {
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
  isWordView: boolean;
  toggleChecked: boolean;
  handleToggleChange: (value: boolean) => void;
};

export const SubHeader: React.FC<SubHeaderProps> = ({
  topicsSize,
  setTopicsSize,
  isWordView,
  toggleChecked,
  handleToggleChange,
}) => {
  const { showWrittenWordsLabel } = useL10ns("showWrittenWordsLabel");

  const contentId = useContentId();
  const { pathname } = useLocation();

  const currentLanguageCode =
    pathname.split("/").length >= 2 ? pathname.split("/")[1] : "nob";

  const renderLeftMenu = (): JSX.Element => {
    const element = isWordView ? (
      <span className={styles.tools}>
        <PrintButton />
        <Toggle
          label={showWrittenWordsLabel}
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
    <div className={styles.subHeader}>
      <Breadcrumbs currentLanguageCode={currentLanguageCode} />
      {renderLeftMenu()}
    </div>
  );
};
