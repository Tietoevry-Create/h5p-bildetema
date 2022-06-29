import React from 'react'
import type { Image as ImageType } from "h5p-types";
import { Image } from "../Image/Image";
import { Svg } from "../Svg/Svg";
import styles from "./Editor.module.scss"


export type EditorProps = {
  image: ImageType | undefined
}
export const Editor: React.FC<EditorProps> = ({ image }) => {
  return (
    <div className={styles.editor} onClick={(e) => {console.log("x: ",e.clientX, "\n y: ", e.clientY)}}>
      <Image image={image}/>
      <Svg />
    </div>
  )
}
