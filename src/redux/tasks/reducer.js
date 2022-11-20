import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GETBYID_TASK_PENDING,
  GETBYID_TASK_SUCCESS,
  GETBYID_TASK_ERROR,
  CREATE_TASKS_PENDING,
  CREATE_TASKS_SUCCESS,
  CREATE_TASKS_ERROR,
  UPDATE_TASKS_PENDING,
  UPDATE_TASKS_SUCCESS,
  UPDATE_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false,
  showModalConfirm: false
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not GET Tasks! ${action.payload}` },
        showModalMessage: true
      };
    case GETBYID_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GETBYID_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: action.payload
      };
    case GETBYID_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not GET Task! ${action.payload}` },
        showModalMessage: true
      };
    case DELETE_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list.filter((task) => task._id !== action.payload)],
        modalContent: {
          title: 'SUCCESS',
          content: `Task with id ${action.payload} successfully deleted`
        },
        showModalMessage: true
      };
    case DELETE_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not DELETE Task! ${action.payload}` },
        showModalMessage: true
      };
    case CREATE_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showModalConfirm: false,
        modalContent: { title: 'SUCCESS!', content: `Task Successfully CREATED` },
        showModalMessage: true,
        list: [...state.list, action.payload]
      };
    case CREATE_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not CREATE Task! ${action.payload}` },
        showModalMessage: true
      };
    case UPDATE_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showModalConfirm: false,
        modalContent: { title: 'SUCCESS!', content: `Task Successfully UPDATED` },
        showModalMessage: true,
        list: [...state.list, action.payload]
      };
    case UPDATE_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not UPDATE Task! ${action.payload}` },
        showModalMessage: true
      };
    case CONFIRM_MODAL_OPEN:
      return {
        ...state,
        modalContent: {
          title: 'Confirm:',
          content: action.payload
        },
        showModalConfirm: true
      };
    case CONFIRM_MODAL_CLOSE:
      return {
        ...state,
        showModalConfirm: false
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
    default:
      return state;
  }
};

export default tasksReducer;
