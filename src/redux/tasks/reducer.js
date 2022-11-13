import { GET_TASKS_ERROR, GET_TASKS_PENDING, GET_TASKS_SUCCESS, CLOSE_MESSAGE_MODAL } from './constants';

const INITIAL_STATE = {
  list: [],
  isPending: false,
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case GET_TASKS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case GET_TASKS_ERROR: {
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    }
    case CLOSE_MESSAGE_MODAL: {
      return {
        ...state,
        showModalMessage: false
      };
    }
    default:
      return state;
  }
};

export default tasksReducer;