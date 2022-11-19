import {
  GET_TASKS_ERROR,
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GETBYID_TASK_ERROR,
  GETBYID_TASK_PENDING,
  GETBYID_TASK_SUCCESS,
  DELETE_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  CREATE_TASKS_ERROR,
  CREATE_TASKS_PENDING,
  CREATE_TASKS_SUCCESS,
  UPDATE_TASKS_ERROR,
  UPDATE_TASKS_PENDING,
  UPDATE_TASKS_SUCCESS,
  CLOSE_MESSAGE_MODAL,
  CLOSE_CONFIRM_MODAL
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
    case GET_TASKS_PENDING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_TASKS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    }
    case GET_TASKS_ERROR: {
      return {
        ...state,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Could not GET Tasks! ${action.payload}` },
        showModalMessage: true,
        isLoading: false
      };
    }
    case GETBYID_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GETBYID_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        task: action.payload
      };
    case GETBYID_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: { title: 'ERROR!', content: `Could not GET Task! ${action.payload}` },
        showModalMessage: true
      };
    case DELETE_TASKS_PENDING: {
      return {
        ...state,
        modalContent: {
          title: 'CONFIRM',
          content: `Are you sure you want to delete the task with id ${action.payload}`
        },
        showModalConfirm: true
      };
    }
    case DELETE_TASKS_SUCCESS: {
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload),
        modalContent: {
          title: 'SUCCESS!',
          content: `Task whit id ${action.payload} successfully deleted`
        },
        showModalMessage: true
      };
    }
    case DELETE_TASKS_ERROR: {
      return {
        ...state,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Task could not be removed. ${action.payload}` },
        showModalMessage: true
      };
    }
    case CREATE_TASKS_PENDING: {
      return {
        ...state,
        modalContent: {
          title: 'CONFIRM',
          content: `Are you sure you want to create a new Task`
        },
        showModalConfirm: true
      };
    }
    case CREATE_TASKS_SUCCESS: {
      return {
        ...state,
        modalContent: {
          title: 'SUCCESS!',
          content: `New task created successfully.`
        },
        showModalMessage: true
      };
    }
    case CREATE_TASKS_ERROR: {
      return {
        ...state,
        error: action.payload,
        modalContent: {
          title: 'ERROR!',
          content: `Could not create a new task. ${action.payload}`
        },
        showModalMessage: true
      };
    }
    case UPDATE_TASKS_PENDING: {
      return {
        ...state,
        modalContent: {
          title: 'CONFIRM',
          content: `Are you sure you want to update the task with id ${action.payload}`
        },
        showModalConfirm: true
      };
    }
    case UPDATE_TASKS_SUCCESS: {
      return {
        ...state,
        modalContent: {
          title: 'SUCCESS!',
          content: `Task ${action.payload[0]} whit id ${action.payload[1]} successfully updated`
        },
        showModalMessage: true
      };
    }
    case UPDATE_TASKS_ERROR: {
      return {
        ...state,
        error: action.payload,
        modalContent: { title: 'ERROR!', content: `Task could not be updated. ${action.payload}` },
        showModalMessage: true
      };
    }
    case CLOSE_MESSAGE_MODAL: {
      return {
        ...state,
        showModalMessage: false
      };
    }
    case CLOSE_CONFIRM_MODAL: {
      return {
        ...state,
        showModalConfirm: false
      };
    }
    default:
      return state;
  }
};

export default tasksReducer;
