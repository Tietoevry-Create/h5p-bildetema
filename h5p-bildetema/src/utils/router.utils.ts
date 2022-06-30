import { LanguageCode } from "../../../common/types/LanguageCode";
import { Topic } from "../../../common/types/types";

export const getTopicSlug = (
  topic: Topic,
  languageCode: LanguageCode,
): string =>
  encodeURIComponent(
    topic.labelTranslations
      .get(languageCode)
      ?.label.toLowerCase()
      .split(" ")
      .join("-") ?? topic.id.toLowerCase(),
  );
