import * as React from "react";
import { Link } from "react-router-dom";
import { Topic, Word, Image } from "../../../../common/types/types";
import styles from "./TopicGridElement.module.scss";

type TopicGridElementProps = {
  item?: Topic | Word;
  index: number;
  title: string;
  image?: Image;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TopicGridElement: React.FC<TopicGridElementProps> = ({
  item,
  title,
  index,
  image,
}) => {
  return (
    <Link
      className={`${styles.topicCard} ${item ? styles.disabled : ""}`}
      to={`${encodeURIComponent(title.toLowerCase().split(" ").join("-"))}`}
    >
      {
        // TODO: remove hardcoded src url after getting access to the images
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          className={styles.topicImage}
          src={
            image?.path ??
            "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb"
          }
          alt={image?.alt}
        />
      }
      <span
        className={`${styles.gridElement} ${item ? styles.disabled : ""}`}
      >{`${index + 1}. ${title}`}</span>
    </Link>
  );
};
