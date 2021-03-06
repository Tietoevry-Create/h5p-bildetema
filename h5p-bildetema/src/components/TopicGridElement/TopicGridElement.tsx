import * as React from "react";
import { Link } from "react-router-dom";
import {
  Topic,
  Word,
  TopicGridSizes,
  ImageUrl,
} from "../../../../common/types/types";
import styles from "./TopicGridElement.module.scss";

type TopicGridElementProps = {
  item?: Topic | Word;
  index: number;
  title: string;
  images: ImageUrl[];
  topicSize: TopicGridSizes;
};

export const TopicGridElement: React.FC<TopicGridElementProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  item,
  title,
  index,
  images,
  topicSize,
}) => {
  const topicCardClassName =
    topicSize === TopicGridSizes.Big
      ? styles.topicCardBig
      : styles.topicCardCompact;
  const gridElementClassName =
    topicSize === TopicGridSizes.Big
      ? styles.gridElementBig
      : styles.gridElementCompact;
  const linkTo = `${encodeURIComponent(
    title.toLowerCase().split(" ").join("-"),
  )}`;
  // TODO: remove hardcoded src url after getting access to the images
  const imageSrc =
    images.at(0)?.src ??
    "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb";
  const topicLabel = `${index + 1}. ${title}`;

  return (
    <Link className={topicCardClassName} to={linkTo}>
      <img className={styles.topicImage} src={imageSrc} alt="" />
      <span className={gridElementClassName}>{topicLabel}</span>
    </Link>
  );
};
