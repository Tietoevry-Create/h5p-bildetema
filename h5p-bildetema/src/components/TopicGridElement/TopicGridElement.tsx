import { LanguageCode } from "common/types/LanguageCode";
import { NewWord, TopicGridSizes } from "common/types/types";
import { labelToUrlComponent } from "common/utils/string.utils";
import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { getImageSrc } from "common/utils/image/image.utils";
import { getAudioFiles } from "common/utils/audio/audio.utils";
import { toSingleLabel } from "common/utils/word.utils";
import styles from "./TopicGridElement.module.scss";
import { TopicGridElementAudio } from "../TopicGridElementAudio/TopicGridElementAudio";

export type TopicGridElementProps = {
  topicSize: TopicGridSizes;
  languageCode: LanguageCode;
  topic: NewWord;
};

export const TopicGridElement: FC<TopicGridElementProps> = ({
  topic,
  topicSize,
  languageCode,
}) => {
  const backendUrl = useBackendUrlContext();

  const { audioFiles, imageSrc, title } = useMemo(() => {
    const a = getAudioFiles(topic.id, backendUrl, languageCode);
    const i = getImageSrc(topic.images.at(0) || "", backendUrl);
    const t = toSingleLabel(topic.translations.get(languageCode)?.labels || []);
    return { audioFiles: a, imageSrc: i, title: t };
  }, [topic.id, topic.images, topic.translations, backendUrl, languageCode]);

  const topicCardClassName =
    topicSize === TopicGridSizes.Big
      ? styles.topicCardBig
      : styles.topicCardCompact;
  const gridElementClassName =
    topicSize === TopicGridSizes.Big
      ? styles.gridElementBig
      : styles.gridElementCompact;
  const linkTo = labelToUrlComponent(title);

  const { search } = useLocation();
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li role="listitem">
      <div className={topicCardClassName}>
        <img className={styles.topicImage} src={imageSrc} alt="" />
        <Link className={styles.topicLink} to={`${linkTo}${search}`}>
          <h2>{title}</h2>
        </Link>
        <span className={gridElementClassName}>
          <h2 aria-hidden="true">{title}</h2>
          <TopicGridElementAudio audioFiles={audioFiles} />
        </span>
      </div>
    </li>
  );
};
