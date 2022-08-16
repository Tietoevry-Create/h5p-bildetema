import { Language, Topic, TopicIds, Word } from "../../../common/types/types";

export type TopicsAndWords = {
  topics?: Topic[];
  words?: Word[];
  language?: Language;
  currentTopic?: TopicIds;
};
