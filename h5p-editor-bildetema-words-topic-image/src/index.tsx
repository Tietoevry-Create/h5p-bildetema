import { H5PEditor, registerWidget } from "h5p-utils";
import { ChooseTopicH5PWrapper } from "./h5p/ChooseTopicH5PWrapper";
import { H5PWrapper } from "./h5p/H5PWrapper";
import "./styles.scss";

registerWidget(
  "BildetemaWordsTopicImage",
  "bildetemaWordsTopicImage",
  H5PWrapper,
);

registerWidget(
  "ChooseTopicWidget",
  "chooseTopicWidget",
  ChooseTopicH5PWrapper,
);

H5PEditor.widgets.bildetemaWordsTopicImage = H5PWrapper;
H5PEditor.widgets.chooseTopicWidget = ChooseTopicH5PWrapper;