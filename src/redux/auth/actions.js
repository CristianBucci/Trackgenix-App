import {
  FIREBASE_LOGIN_PENDING,
  FIREBASE_LOGIN_SUCCESS,
  FIREBASE_LOGIN_ERROR,
  FIREBASE_SIGN_UP_PENDING,
  FIREBASE_SIGN_UP_SUCCESS,
  FIREBASE_SIGN_UP_ERROR,
  FIREBASE_LOGOUT_PENDING,
  FIREBASE_LOGOUT_SUCCESS,
  FIREBASE_LOGOUT_ERROR,
  FIREBASE_SET_AUTH
} from './constants';

export const firebaseLoginPending = (data) => {
  return {
    type: FIREBASE_LOGIN_PENDING,
    payload: data
  };
};

export const firebaseLoginSuccess = (data) => {
  return {
    type: FIREBASE_LOGIN_SUCCESS,
    payload: data
  };
};

export const firebaseLoginError = (data) => {
  return {
    type: FIREBASE_LOGIN_ERROR,
    payload: data
  };
};

export const firebaseSignUpPending = (data) => {
  return {
    type: FIREBASE_SIGN_UP_PENDING,
    payload: data
  };
};

export const firebaseSignUpSuccess = (data) => {
  return {
    type: FIREBASE_SIGN_UP_SUCCESS,
    payload: data
  };
};

export const firebaseSignUpError = (data) => {
  return {
    type: FIREBASE_SIGN_UP_ERROR,
    payload: data
  };
};

export const firebaseLogoutPending = (data) => {
  return {
    type: FIREBASE_LOGOUT_PENDING,
    payload: data
  };
};

export const firebaseLogoutSuccess = (data) => {
  return {
    type: FIREBASE_LOGOUT_SUCCESS,
    payload: data
  };
};

export const firebaseLogoutError = (data) => {
  return {
    type: FIREBASE_LOGOUT_ERROR,
    payload: data
  };
};

export const setAuthentication = (data) => {
  return {
    type: FIREBASE_SET_AUTH,
    payload: data
  };
};
