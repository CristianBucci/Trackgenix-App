import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import store from 'redux/store';
import { firebaseLoginSuccess } from 'redux/auth/actions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line
const analytics = getAnalytics(app);

const auth = getAuth(app);

const tokenListener = () => {
  onIdTokenChanged(auth, async (user) => {
    if (user) {
      try {
        const {
          token,
          claims: { role, email }
        } = await user.getIdTokenResult();
        if (token) {
          const mongoUser = await fetch(
            `${process.env.REACT_APP_API_URL}/employees/?email=${email}`,
            { headers: { token } }
          );
          const data = await mongoUser.json();
          const mongoId = data.data[0]._id;
          store.dispatch(firebaseLoginSuccess({ role, email }));
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('id', mongoId);
        }
      } catch (error) {
        throw new Error(error.toString());
      }
    }
  });
};

export { tokenListener, auth };
