import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  CLOSE_MESSAGE_MODAL,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  modalContent: { title: '', content: '' },
  modalConfirm: { title: 'CONFIRM', content: 'Are you sure?' },
  showModalMessage: false
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
    case CLOSE_MESSAGE_MODAL:
      return {
        ...state,
        modalContent: { title: '', content: '' },
        showModalMessage: false
      };
    case DELETE_PROJECTS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        modalContent: {
          title: 'SUCCESS',
          content: `Project deleted successfully`
        },
        showModalMessage: true,
        list: state.list.filter((item) => item._id !== action.payload),
        isPending: false
      };
    case DELETE_PROJECTS_ERROR:
      return {
        ...state,
        isPending: false,
        showModalMessage: true,
        modalContent: {
          title: 'ERROR',
          content: `Could not DELETE project`
        }
      };
    default:
      return state;
  }
};

export default projectsReducer;
