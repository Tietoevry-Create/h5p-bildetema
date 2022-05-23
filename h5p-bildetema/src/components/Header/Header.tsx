import React from 'react'
import styles from './Header.module.scss'
import logo from './logo_no.png'

const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
      <div className={styles.language_container}>
        <div>Språkvalg</div>
        <div className={styles.languages}>
          <p>Engelsk</p>
          <p>Norsk</p>
          <p>Nynorsk</p>
        </div>
      </div>
    </div>
  )
}

export default Header