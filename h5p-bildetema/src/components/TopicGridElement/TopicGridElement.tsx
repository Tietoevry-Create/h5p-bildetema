import { LanguageCode } from "common/types/LanguageCode";
import { ImageUrl, NewWord, Topic, TopicGridSizes } from "common/types/types";
import { labelToUrlComponent } from "common/utils/string.utils";
import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { TopicGridElementAudio } from "../TopicGridElementAudio/TopicGridElementAudio";
import styles from "./TopicGridElement.module.scss";
import { useBackendUrlContext } from "common/hooks/useBackendUrlContext";
import { getImageSrc } from "common/utils/image/image.utils";
import {getAudioFiles} from "common/utils/audio/audio.utils";
import { toSingleLabel } from "common/utils/word.utils";

export type TopicGridElementProps = {
  // topic: Topic;
  // title: string;
  // images: ImageUrl[];
  topicSize: TopicGridSizes;
  languageCode: LanguageCode;
  topic: NewWord
  // imageSrc: string
  // audioFiles: AudioFile[]
};

export const TopicGridElement: FC<TopicGridElementProps> = ({
  // topic,
  // title,
  // images,

  // img = "",
  // audioFiles,
  // imageSrc,
  topic,
  topicSize,
  languageCode,
}) => {

  const backendUrl = useBackendUrlContext()
  
  const {audioFiles, imageSrc, title} = useMemo(() => {
    const a = getAudioFiles(topic.id, backendUrl, languageCode)  
    const i = getImageSrc(topic.images.at(0) || "", backendUrl)
    const t = toSingleLabel(topic.translations.get(languageCode)?.labels || [])
    return {audioFiles: a, imageSrc: i, title: t}
  }, [topic.id, topic.images, topic.translations, backendUrl, languageCode])
  
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
  // const imageSrc =
  //   images.at(0)?.src ??
  //   "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&w=640&q=80&fm=jpg&crop=entropy&cs=tinysrgb";


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
