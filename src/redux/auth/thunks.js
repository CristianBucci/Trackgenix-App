import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'helpers/firebase';
import {
  firebaseLoginPending,
  firebaseLoginError,
  firebaseSignUpPending,
  firebaseSignUpSuccess,
  firebaseSignUpError,
  firebaseLogoutPending,
  firebaseLogoutSuccess,
  firebaseLogoutError
} from './actions';

export const login = (inputData) => {
  return async (dispatch) => {
    dispatch(firebaseLoginPending());
    try {
      const response = await signInWithEmailAndPassword(auth, inputData.email, inputData.password);
      const {
        token,
        claims: { role }
      } = await response.user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      return role;
    } catch (error) {
      dispatch(firebaseLoginError(error.message));
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
      sessionStorage.clear();
      dispatch(firebaseLogoutSuccess());
    } catch (error) {
      dispatch(firebaseLogoutError());
    }
  };
};
