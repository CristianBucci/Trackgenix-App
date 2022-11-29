import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
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
      const response = await signInWithEmailAndPassword(auth, role.email, role.password);
      const user = response.user;
      alert(`User ${user.email} login successful`);
      // console.log for QA
      console.log('User access token:', user.accessToken);
      dispatch(firebaseLoginSuccess(role));
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
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
      await signOut(auth);
      alert('logout successful');
      dispatch(firebaseLogoutSuccess());
    } catch (error) {
      console.error(error);
      dispatch(firebaseLogoutError());
    }
  };
};
