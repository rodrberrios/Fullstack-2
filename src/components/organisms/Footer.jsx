import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerBrand}>
          <h5>Level UP Gamer</h5>
        </div>
        
        <div className={styles.footerLinks}>
          <ul>
            <li><a href="#" className={styles.footerLink}>Instagram</a></li>
            <li><a href="#" className={styles.footerLink}>Twitter</a></li>
            <li><a href="#" className={styles.footerLink}>Facebook</a></li>
          </ul>
        </div>
        
        <div className={styles.footerSubscribe}>
          <input 
            type="email" 
            placeholder="Tu email" 
            className={styles.subscribeInput}
          />
          <button className={styles.subscribeButton}>
            Suscribirse
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer