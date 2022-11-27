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

export const login = () => {
  return async (dispatch) => {
    dispatch(firebaseLoginPending());
    try {
      dispatch(firebaseLoginSuccess());
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
