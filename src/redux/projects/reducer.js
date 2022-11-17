import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  CREATE_PROJECT_PENDING,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  UPDATE_PROJECT_PENDING,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false,
  showConfirmModal: false
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: { title: 'ERROR!', content: `Could not GET projects!\n${action.payload}` },
        showModalMessage: true
      };
    case CREATE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS!',
          content: `Project whit id ${action.msg} successfully created`
        },
        showModalMessage: true
      };
    case CREATE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        showConfirmModal: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not create Project! ${action.payload}`
        },
        showModalMessage: true
      };
    case UPDATE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS!',
          content: action.msg
        },
        showModalMessage: true
      };
    case UPDATE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: {
          title: 'ERROR',
          content: action.payload
        },
        showModalMessage: true
      };
    case DELETE_PROJECT_PENDING:
      return {
        ...state,
        showModalMessage: !state.showModalMessage,
        isLoading: true
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list.filter((item) => item._id !== action.payload)],
        modalContent: {
          title: 'SUCCESS!',
          content: `Project whit id ${action.payload} successfully deleted`
        },
        showModalMessage: true
      };
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: {
          title: 'ERROR!',
          content: `Could not DELETE project! ${action.payload}`
        },
        showModalMessage: true
      };
    case MESSAGE_MODAL_OPEN:
      return {
        ...state,
        modalContent: {
          title: action.payload.title,
          content: action.payload
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
    default:
      return state;
  }
};

export default projectsReducer;
