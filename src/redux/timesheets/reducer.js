import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  TOGGLE_MESSAGE_MODAL
} from './constants';

const INITIAL_STATE = {
  isLoading: false,
  list: [],
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false
};

const timeSheetsReducer = (state = INITIAL_STATE, action) => {
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
        modalContent: { title: 'ERROR!', content: `Could not GET TimeSheets! ${action.payload}` },
        showModalMessage: true,
        isLoading: false
      };
    case TOGGLE_MESSAGE_MODAL:
      return {
        ...state,
        showModalMessage: !state.showModalMessage
      };
    default:
      return state;
  }
};

export default timeSheetsReducer;
