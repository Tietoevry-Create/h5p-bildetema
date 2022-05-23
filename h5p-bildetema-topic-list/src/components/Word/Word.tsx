import React from "react";
import styles from "./Word.module.scss";
import { Word as WordType } from "../../../../common/types/types";

export type WordProps = {
  clickHandler: React.Dispatch<WordType>;
  word: WordType;
  textVisible: boolean;
};

const Word: React.FC<WordProps> = ({
  clickHandler,
  textVisible,
  word,
}) => {
  const { id, label, images } = word
  const renderImages = (): JSX.Element => {
    switch(images.length) {
      case 0:
        return (<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019" alt="" />)
      case 1:
        return (<img src={images[0]} alt="" />)
      default:
        return (<div>greater than 1</div>)
        
    }
  }

  return (
    <button onClick={() => {clickHandler(word)} }className={styles.word} type="button">
      <div className={styles.image_container}>
        {renderImages()}
      </div>
      {textVisible && <p>{label}</p>}
    </button>
  );
};

export default Word;
