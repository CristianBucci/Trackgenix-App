import {
    GET_TASKS_PENDING,
    GET_TASKS_SUCCESS,
    GET_TASKS_ERROR,
    CLOSE_MESSAGE_MODAL
} from './constants';

export const getTasksPending = () => {
    return {
      type: GET_TASKS_PENDING
    };
};

export const getTasksSuccess = (data) => {
    return {
      type: GET_TASKS_SUCCESS,
      payload: data
    };
};

export const getTasksError = (error) => {
    return {
      type: GET_TASKS_ERROR,
      payload: error
    };
};

export const messageModalClose = () => {
    return {
      type: CLOSE_MESSAGE_MODAL
    };
};