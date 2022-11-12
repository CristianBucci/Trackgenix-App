import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  CLOSE_MESSAGE_MODAL
} from './constants';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesSuccess = (data) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const getEmployeesError = (error) => {
  return {
    type: GET_EMPLOYEES_ERROR,
    payload: error
  };
};

export const closeMessageModal = () => {
  return {
    type: CLOSE_MESSAGE_MODAL
  };
};
