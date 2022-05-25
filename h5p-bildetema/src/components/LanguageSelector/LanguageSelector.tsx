import React from 'react'
import styles from "./LanguageSelector.module.scss"
import { Language as LanguageType} from "../../../../common/types/types"
import { Language } from ".."

type LanguageSelectorProps = {
  languages: LanguageType[]
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({languages}) => {
  
  return (
    <div className={styles.languageSelector}>
      {languages.map(language => (
        <div className={styles.language_select}>
          <Language language={language}/>
        </div>
      ))}
    </div>
  )
}
