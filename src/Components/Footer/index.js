import { Link } from 'react-router-dom';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link className={styles.link} to="/home">
        <h2 className={styles.hover}>TRACKGENIX</h2>
      </Link>
      <div className={styles.iconWrapper}>
        <ul>
          <li>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <span>Facebook</span>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
                alt="facebook-icon"
              />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <span>Twitter</span>
              <img src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`} alt="twitter-icon" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <span>Instagram</span>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
                alt="instagram-icon"
              />
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.copyright}>
        <p>Copyright ©{new Date().getFullYear()} TrackGenix</p>
        <div className={styles.email}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/email-icon.png`} />
          <p>Trackgenix@genix.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
