import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  GETBYID_EMPLOYEES_PENDING,
  GETBYID_EMPLOYEES_SUCCESS,
  GETBYID_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR,
  POST_EMPLOYEES_PENDING,
  POST_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_ERROR,
  PUT_EMPLOYEES_PENDING,
  PUT_EMPLOYEES_SUCCESS,
  PUT_EMPLOYEES_ERROR,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
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

const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not GET Employees! ${action.payload}` },
        showModalMessage: true
      };
    case GETBYID_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GETBYID_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: action.payload
      };
    case GETBYID_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not GET Employee! ${action.payload}` },
        showModalMessage: true
      };
    case DELETE_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list.filter((employee) => employee._id !== action.payload)],
        modalContent: { title: 'SUCCESS!', content: 'Account Successfully DELETED' },
        showModalMessage: true
      };
    case DELETE_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not DELETE Employee! ${action.payload}` },
        showModalMessage: true
      };
    case POST_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showConfirmModal: false,
        modalContent: { title: 'SUCCESS!', content: 'Employee Successfully CREATED' },
        showModalMessage: true,
        list: [...state.list, action.payload]
      };
    case POST_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not CREATE Employee! ${action.payload}` },
        showModalMessage: true
      };
    case PUT_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showConfirmModal: false,
        modalContent: { title: 'SUCCESS!', content: 'Employee Successfully UPDATED' },
        showModalMessage: true,
        list: [...state.list, action.payload]
      };
    case PUT_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: {
          title: 'ERROR!',
          content: `Could not UPDATE Employee! ${action.payload.message}`
        },
        showModalMessage: true
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
    case MESSAGE_MODAL_OPEN:
      return {
        ...state,
        showModalMessage: true
      };
    case MESSAGE_MODAL_CLOSE:
      return {
        ...state,
        showModalMessage: false
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

export default employeesReducer;
