import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import {
  ImageUrl,
  Topic,
  TopicGridSizes,
} from "../../../../common/types/types";
import { labelToUrlComponent } from "../../../../common/utils/string.utils";
import { TopicGridElementAudio } from "../TopicGridElementAudio/TopicGridElementAudio";
import styles from "./TopicGridElement.module.scss";

export type TopicGridElementProps = {
  topic: Topic;
  title: string;
  images: ImageUrl[];
  topicSize: TopicGridSizes;
  languageCode: LanguageCode;
  rtl: boolean;
};

export const TopicGridElement: React.FC<TopicGridElementProps> = ({
  topic,
  title,
  images,
  topicSize,
  languageCode,
  rtl,
}) => {
  const audioFiles = topic.labelTranslations.get(languageCode)?.audioFiles;
  const topicCardClassName =
    topicSize === TopicGridSizes.Big
      ? styles.topicCardBig
      : styles.topicCardCompact;
  const gridElementClassName =
    topicSize === TopicGridSizes.Big
      ? styles.gridElementBig
      : styles.gridElementCompact;
  const linkTo = labelToUrlComponent(title);
  // TODO: remove hardcoded src url after getting access to the images
  const imageSrc =
    images.at(0)?.src ??
    "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb";
  const { search } = useLocation();
  return (
    <Link className={topicCardClassName} to={`${linkTo}${search}`}>
      <img className={styles.topicImage} src={imageSrc} alt="" />
      <span className={`${gridElementClassName} ${rtl ? styles.rtl : ""}`}>
        {title}
        <TopicGridElementAudio audioFiles={audioFiles} rtl={rtl} />
      </span>
    </Link>
  );
};
