import React from 'react'
import styles from "./Language.module.scss"
import { Language as LanguageType} from "../../../../common/types/types"

type SelectProps = {
  language: LanguageType
}

export const Language: React.FC<SelectProps> = ({language:{label}}) => {
  
  return (
    <div className={styles.language}>
      <div>
        <label className={styles.input_container}>
          <input type="checkbox"/>
          <span className={styles.checkmark}></span>
        </label>
      </div>
      <button className={styles.language_label} >
        {label}
      </button>
    </div>
  )
}
