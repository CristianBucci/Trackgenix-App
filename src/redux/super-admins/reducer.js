import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  GET_BY_ID_SUPER_ADMINS_PENDING,
  GET_BY_ID_SUPER_ADMINS_SUCCESS,
  GET_BY_ID_SUPER_ADMINS_ERROR,
  POST_SUPER_ADMINS_PENDING,
  POST_SUPER_ADMINS_SUCCESS,
  POST_SUPER_ADMINS_ERROR,
  UPDATE_SUPER_ADMINS_ERROR,
  UPDATE_SUPER_ADMINS_PENDING,
  UPDATE_SUPER_ADMINS_SUCCESS,
  DELETE_SUPER_ADMINS_PENDING,
  DELETE_SUPER_ADMINS_SUCCESS,
  DELETE_SUPER_ADMINS_ERROR,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE,
  PASSWORD_MODAL_OPEN,
  PASSWORD_MODAL_CLOSE
} from './constants';

const INITIAL_STATE = {
  isLoading: false,
  list: [],
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false,
  showConfirmModal: false,
  showPasswordModal: false
};

const superAdminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_SUPER_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR', content: `Could not GET SuperAdmin! ${action.payload}` },
        showModalMessage: true
      };
    case GET_BY_ID_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_BY_ID_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: action.payload
      };
    case GET_BY_ID_SUPER_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR', content: `Could not GET SuperAdmin! ${action.payload}` },
        showModalMessage: true
      };
    case POST_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS!',
          content: 'SuperAdmin Successfully CREATED'
        },
        showModalMessage: true
      };
    case POST_SUPER_ADMINS_ERROR:
      return {
        isLoading: false,
        error: action.payload,
        showConfirmModal: false,
        modalContent: {
          title: 'ERROR!',
          content: 'Could not CREATE SuperAdmin'
        },
        showModalMessage: true
      };
    case UPDATE_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS!',
          content: 'SuperAdmin Successfully UPDATED'
        },
        showModalMessage: true
      };
    case UPDATE_SUPER_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: {
          title: 'ERROR',
          content: 'Could not UPDATE SuperAdmin'
        },
        showModalMessage: true
      };
    case DELETE_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list.filter((item) => item._id !== action.payload)],
        modalContent: {
          title: 'SUCCESS!',
          content: `SuperAdmin whit id ${action.payload} successfully deleted`
        },
        showModalMessage: true
      };
    case DELETE_SUPER_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: {
          title: 'ERROR!',
          content: 'Could not DELETE SuperAdmin'
        },
        showModalMessage: true
      };
    case MESSAGE_MODAL_OPEN:
      return {
        ...state,
        modalContent: {
          title: action.payload.title,
          content: action.payload.content
        },
        showModalMessage: true
      };
    case MESSAGE_MODAL_CLOSE:
      return {
        ...state,
        showModalMessage: false
      };
    case CONFIRM_MODAL_OPEN:
      return {
        ...state,
        modalContent: {
          title: 'Confirm:',
          content: action.payload
        },
        showConfirmModal: true
      };
    case CONFIRM_MODAL_CLOSE:
      return {
        ...state,
        showConfirmModal: false
      };
    case PASSWORD_MODAL_OPEN:
      return {
        ...state,
        showPasswordModal: true
      };
    case PASSWORD_MODAL_CLOSE:
      return {
        ...state,
        showPasswordModal: false
      };
    default:
      return state;
  }
};

export default superAdminsReducer;
