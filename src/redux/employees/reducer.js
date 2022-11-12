import {
  GET_EMPLOYEES_ERROR,
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  CLOSE_MESSAGE_MODAL
} from './constants';

const INITIAL_STATE = {
  isLoading: false,
  error: '',
  list: [],
  showModalMessage: false,
  modalContent: { title: '', content: '' }
};

const reducer = (state = INITIAL_STATE, action) => {
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
        error: '',
        list: action.payload
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not GET Employees! ${action.payload}` },
        showModalMessage: true,
        list: []
      };
    case CLOSE_MESSAGE_MODAL:
      return {
        ...state,
        modalContent: { title: '', content: '' },
        showModalMessage: false,
        list: []
      };
    default:
      return state;
  }
};

export default reducer;
