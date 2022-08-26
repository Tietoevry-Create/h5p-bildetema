import React from 'react'
import styles from "./Checkbox.module.scss"

type CheckboxProps = {
  id: string,
  handleClick: () => void,
  isChecked: boolean,
  isDisabled: boolean,
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id, handleClick, isChecked, isDisabled
}) => {
  
  return (
    <label className={styles.container} htmlFor={id}>
      <span className={styles.wrapper}>
        <input id={id} type="checkbox" defaultChecked={isChecked} onClick={handleClick} disabled={isDisabled}/>
        <span className={styles.star}/>
      </span>
    </label>
  )
}
