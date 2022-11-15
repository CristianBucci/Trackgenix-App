import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  POST_SUPER_ADMINS_PENDING,
  POST_SUPER_ADMINS_SUCCESS,
  POST_SUPER_ADMINS_ERROR,
  UPDATE_SUPER_ADMINS_ERROR,
  UPDATE_SUPER_ADMINS_PENDING,
  UPDATE_SUPER_ADMINS_SUCCESS,
  DELETE_SUPER_ADMINS_PENDING,
  DELETE_SUPER_ADMINS_SUCCESS,
  DELETE_SUPER_ADMINS_ERROR,
  CLOSE_MESSAGE_MODAL
} from './constants';

const INITIAL_STATE = {
  list: [],
  error: '',
  isPending: false,
  modalContent: { title: '', content: '' },
  showModalMessage: false
};

const superAdminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GET_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        isPending: false,
        list: action.payload
      };
    case GET_SUPER_ADMINS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload,
        modalContent: { title: 'ERROR', content: `Could not GET Super Admin! ${action.payload}` },
        showModalMessage: true
      };
    case POST_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case POST_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        isPending: false,
        list: action.payload
      };
    case POST_SUPER_ADMINS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload,
        modalContent: {
          title: 'ERROR',
          content: `Could not POST Super Admin! ${action.payload}`
        },
        showModalMessage: true
      };
    case UPDATE_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case UPDATE_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        isPending: false,
        list: action.payload
      };
    case UPDATE_SUPER_ADMINS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload,
        modalContent: {
          title: 'ERROR',
          content: `Could not UPDATE Super Admin! ${action.payload}`
        },
        showModalMessage: true
      };
    case DELETE_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        isPending: false
      };
    case DELETE_SUPER_ADMINS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload,
        modalContent: {
          title: 'ERROR',
          content: `Could not DELETE Super Admin! ${action.payload}`
        },
        showModalMessage: true
      };
    case CLOSE_MESSAGE_MODAL:
      return {
        ...state,
        showModalMessage: false
      };
    default:
      return state;
  }
};

export default superAdminsReducer;
