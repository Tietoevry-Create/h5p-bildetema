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
            "https://s3-alpha-sig.figma.com/img/68c5/8247/e72b8c415b6ce9d1d6a9be597d0a4d41?Expires=1656288000&Signature=UTefYYa7istTasgM6UyM3pkW8ZKa1DMyAtBre4U71LnybnhJBQZnVegj1ar-d3XYupRijqy7~KCvtA9zCsvwjwohj-8EqElm9RyZD-R4Py3cmRCXyNOgwrYZdQHjcLatIqGQr7Zpj6X5hEBcZi1K~g2TOIbrTw6QdRJulmQMtxkb-RIydyenPKA23qJxlOH-gBwvEXdSegDtWQSosCCkohi8LzbQy6~S4m7TcsLCUmzjjK-jkOBxNwihZxfC0HXNSkZMFDHLvhEQB8UJ7L6Fb4aGWAo6AVz1cdgBBnURTTSIDrgRcF6e6uwyTNCs1l8DZbA-le52jYAAVd9KW8I~pQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
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
