import React from 'react'
import styles from './Header.module.scss'
import logo from './logo_no.png'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left_menu}>
        <div className={styles.menu}> Menu</div>
        <div className={styles.image}>
          <img src={logo} alt="" />
        </div>
      </div>
      <div className={styles.right_menu}>
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