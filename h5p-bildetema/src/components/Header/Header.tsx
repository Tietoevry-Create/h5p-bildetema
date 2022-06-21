import React from "react";
import { TopicGridSizes } from "../../../../common/types/types";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { TopicSizeButtons } from "../TopicSizeButtons/TopicSizeButtons";
import styles from "./Header.module.scss";

export type HeaderProps = {
  currentLanguageCode: string;
  topicsSize: TopicGridSizes;
  setTopicsSize: React.Dispatch<React.SetStateAction<TopicGridSizes>>;
};

export const Header: React.FC<HeaderProps> = ({
  currentLanguageCode,
  topicsSize,
  setTopicsSize,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>{/* TODO: Add logo as SVG */}</div>
        <div className={styles.language_container}>
          {/* TODO: Translate */}
          <div>Språkvalg</div>
          <div className={styles.languages}>
            <p>Engelsk</p>
            <p>Norsk</p>
            <p>Nynorsk</p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Breadcrumbs currentLanguageCode={currentLanguageCode} />
        <TopicSizeButtons
          topicsSize={topicsSize}
          setTopicsSize={setTopicsSize}
        />
      </div>
    </div>
  );
};
