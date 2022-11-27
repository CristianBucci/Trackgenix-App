import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'helpers/firebase';
import {
  firebaseLoginPending,
  firebaseLoginSuccess,
  firebaseLoginError,
  firebaseSignUpPending,
  firebaseSignUpSuccess,
  firebaseSignUpError,
  firebaseLogoutPending,
  firebaseLogoutSuccess,
  firebaseLogoutError
} from './actions';

export const login = (role) => {
  return async (dispatch) => {
    dispatch(firebaseLoginPending());
    try {
      signInWithEmailAndPassword(auth, role.email, role.password)
      .then((userCredential) => {
        // Signed in
        console.log(role);
        const user = userCredential.user;
        alert(`User ${user.email} login successful`);
        console.log('User access token:', user.accessToken);
        dispatch(firebaseLoginSuccess(role));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode, errorMessage);
        dispatch(firebaseLoginError());
      });
    } catch (error) {
      dispatch(firebaseLoginError());
    }
  };
};

export const signUp = () => {
  return async (dispatch) => {
    dispatch(firebaseSignUpPending());
    try {
      dispatch(firebaseSignUpSuccess());
    } catch (error) {
      dispatch(firebaseSignUpError());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(firebaseLogoutPending());
    try {
      dispatch(firebaseLogoutSuccess());
    } catch (error) {
      dispatch(firebaseLogoutError());
    }
  };
};
