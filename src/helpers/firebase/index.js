// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import store from "redux/store";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//!!! Moked user credentials !!!
export const mokedUser = {
  email: "maxig.dev@gmail.com",
  password: "prueba1234"
}


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line
const analytics = getAnalytics(app);

const auth = getAuth(app);

const tokenListener = () => {
  onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          const {
            token
            // claims: { role, email }
          } = await user.getIdTokenResult();
          if (token) {
            // store.dispatch(setLoggedIn({ role, email }));
          }
        } catch (error) {
          throw new Error(error.toString());
        }
      } else {
        // store.dispatch(setLoggedOut());
      };
  });
};

export { tokenListener, auth };