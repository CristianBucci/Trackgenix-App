import styles from './home.module.css';

function Home() {
  return (
    <>
      <main>
        <section className={styles.container}>
          <h2>WELCOME</h2>
          <div className={styles.imgAndText}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/trackgenix-landing-img.jpeg`}
              alt="landing-image"
            />
            <p className={styles.text}>
              Sometimes working with large groups of people can be difficult. Trackgenix is a system
              created to make things easier in cases like that and accomplish your goals in the
              easiest and fastest way.
            </p>
          </div>
        </section>
        <section className={styles.applicationFeaturesContainer}>
          <h2>Application Features</h2>
          <article>
            <div className={styles.applicationImgTextWraper}>
              <h3>Hours Log</h3>
              <img src={`${process.env.PUBLIC_URL}/assets/images/clock.gif`} alt="clock-image" />
            </div>
            <div className={styles.applicationImgTextWraper}>
              <h3>Reports</h3>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/document.gif`}
                alt="reports-image"
              />
            </div>
          </article>
          <article>
            <div className={styles.applicationImgTextWraper}>
              <h3>Resource Management</h3>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/resource-management.gif`}
                alt="resource-managemenet-image"
              />
            </div>
            <div className={styles.applicationImgTextWraper}>
              <h3>Multiple Roles</h3>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/roles.gif`}
                alt="multiple-roles-image"
              />
            </div>
          </article>
        </section>
        <section className={styles.whyShouldUseTgContainer}>
          <h2>Why you should use Trackgenix?</h2>
          <div className={styles.whyUseTgArticlesWrap}>
            <article>
              <div className={styles.useTrackgenixTextContainer}>
                <h3>Productivity Booster</h3>
                <p>
                  Be more productive using better Focus, Time Management, Organization and
                  Efficiency
                </p>
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/boost-product.gif`}
                alt="productivity-booster-image"
              />
            </article>
            <article>
              <div className={styles.useTrackgenixTextContainer}>
                <h3>Work Traceability</h3>
                <p>Keep track of specs, changes, requests, results, and versions</p>
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/work-traceability.gif`}
                alt="work-traceability-image"
              />
            </article>
          </div>
          <div className={styles.whyUseTgArticlesWrap}>
            <article>
              <div className={styles.useTrackgenixTextContainer}>
                <h3>Leadership and team management</h3>
                <p>
                  Lead a group of people in accomplishing a task or common goal. Manage your team`ns
                  effort by assigning new proyects, setting deadlines, roles , and hourly rates for
                  the members of your team.
                </p>
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/leadership.gif`}
                alt="leadership-image"
              />
            </article>
            <article>
              <div className={styles.useTrackgenixTextContainer}>
                <h3>Decision making</h3>
                <p>Make better decisions for your business</p>
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/decision.gif`}
                alt="decision-making-image"
              />
            </article>
          </div>
        </section>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </main>
    </>
  );
}

export default Home;
