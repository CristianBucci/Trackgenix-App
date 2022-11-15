import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_SUCCES,
  POST_TIMESHEETS_ERROR,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE
} from './constants';

const INITIAL_STATE = {
  isLoading: false,
  list: [],
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false,
  showConfirmModal: false
};

const timesheetsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not GET Timesheets! ${action.payload}` },
        showModalMessage: true,
        isLoading: false
      };
    case POST_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_TIMESHEETS_SUCCES:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS!',
          content: action.reqMessage
        },
        showModalMessage: true
      };
    case POST_TIMESHEETS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not add new TimeSheet! ${action.payload}`
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
    default:
      return state;
  }
};

export default timesheetsReducer;
