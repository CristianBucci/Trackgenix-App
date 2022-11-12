import {
    GET_TASKS_PENDING,
    GET_TASKS_SUCCESS,
    GET_TASKS_ERROR,
    CLOSE_MESSAGE_MODAL
} from './constants';

const getTasksPending = () => {
    return {
      type: GET_TASKS_PENDING
    };
};

const getTasksSuccess = (data) => {
    return {
      type: GET_TASKS_SUCCESS,
      payload: data
    };
};

const getTasksError = (error) => {
    return {
      type: GET_TASKS_ERROR,
      payload: error
    };
};

const messageModalClose = () => {
    return {
      type: CLOSE_MESSAGE_MODAL
    };
};

export { getTasksPending, getTasksSuccess, getTasksError };
export default messageModalClose;