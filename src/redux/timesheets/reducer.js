import {
  GET_TIMESHEETS_ERROR,
  GET_TIMESHEETS_LOADING,
  GET_TIMESHEETS_SUCCESS,
  TOGGLE_MESSAGE_MODAL
} from './constants';

const INITIAL_STATE = {
  loading: false,
  list: [],
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false
};

const timeSheetsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not GET TimeSheets! ${action.payload}` },
        showModalMessage: true,
        loading: false
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
