import {
  FIREBASE_LOGIN_PENDING,
  FIREBASE_LOGIN_SUCCESS,
  FIREBASE_LOGIN_ERROR,
  FIREBASE_SIGN_UP_PENDING,
  FIREBASE_SIGN_UP_SUCCESS,
  FIREBASE_SIGN_UP_ERROR,
  FIREBASE_LOGOUT_PENDING,
  FIREBASE_LOGOUT_SUCCESS,
  FIREBASE_LOGOUT_ERROR
} from './constants';

const INITIAL_STATE = {
  role: '',
  email: '',
  isLoading: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIREBASE_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case FIREBASE_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        role: action.payload.role,
        email: action.payload.email
      };
    case FIREBASE_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case FIREBASE_SIGN_UP_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case FIREBASE_SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        role: action.payload.role,
        email: action.payload.email
      };
    case FIREBASE_SIGN_UP_ERROR:
      return {
        ...state,
        isLoading: false
      };
    case FIREBASE_LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case FIREBASE_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        role: action.payload.role,
        email: action.payload.email
      };
    case FIREBASE_LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default authReducer;
