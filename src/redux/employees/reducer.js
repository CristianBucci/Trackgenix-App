import {
  GET_EMPLOYEES_ERROR,
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  CLOSE_MESSAGE_MODAL
} from './constants';

const INITIAL_STATE = {
  isPending: false,
  list: [],
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false
};

const employeeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isPending: false,
        list: action.payload
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not GET Employees! ${action.payload}` },
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

export default employeeReducer;
