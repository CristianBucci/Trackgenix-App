import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  CLOSE_MESSAGE_MODAL
} from './constants';

const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};

const getProjectsSuccess = (data) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload: data
  };
};

const getProjectsError = (error) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
};

const messageModalClose = () => {
  return {
    type: CLOSE_MESSAGE_MODAL
  };
};

export { getProjectsPending, getProjectsSuccess, getProjectsError };
export default messageModalClose;
