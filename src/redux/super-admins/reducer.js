import {
  GET_SUPER_ADMIN_PENDING,
  GET_SUPER_ADMIN_SUCCESS,
  GET_SUPER_ADMIN_ERROR,
  CLOSE_MESSAGE_MODAL
} from './constants';

const INITIAL_STATE = {
  list: [],
  error: '',
  isLoading: false,
  modalContent: { title: '', content: '' },
  showModalMessage: false
};

const superAdminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_SUPER_ADMIN_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload,
        modalContent: { title: 'ERROR', content: `Could not GET Super Admin! ${action.payload}` },
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
