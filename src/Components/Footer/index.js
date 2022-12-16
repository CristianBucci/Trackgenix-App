import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.hover}>TRACKGENIX</h2>
      <div className={styles.iconWrapper}>
        <ul>
          <li>
            <a href="#">
              <i className="fa fa-facebook" aria-hidden="true"></i>
              <span> Facebook</span>
              <img src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`} />
            </a>
          </li>
          <li>
            <a href="#">
              <i aria-hidden="true"></i>
              <span> Twitter</span>
              <img src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`} />
            </a>
          </li>
          <li>
            <a href="#">
              <i aria-hidden="true"></i>
              <span> Instagram</span>
              <img src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`} />
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.copyright}>Copyright © {new Date().getFullYear()} TG</div>
    </footer>
  );
}

export default Footer;
