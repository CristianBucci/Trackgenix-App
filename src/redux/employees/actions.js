import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  GETBYID_EMPLOYEES_PENDING,
  GETBYID_EMPLOYEES_SUCCESS,
  GETBYID_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR,
  POST_EMPLOYEES_PENDING,
  POST_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_ERROR,
  PUT_EMPLOYEES_PENDING,
  PUT_EMPLOYEES_SUCCESS,
  PUT_EMPLOYEES_ERROR,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
  PASSWORD_MODAL_OPEN,
  PASSWORD_MODAL_CLOSE
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

export const getByIdEmployeePending = () => {
  return {
    type: GETBYID_EMPLOYEES_PENDING
  };
};

export const getByIdEmployeeSuccess = (data) => {
  return {
    type: GETBYID_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const getByIdEmployeeError = (error) => {
  return {
    type: GETBYID_EMPLOYEES_ERROR,
    payload: error
  };
};

export const deleteEmployeePending = () => {
  return {
    type: DELETE_EMPLOYEES_PENDING
  };
};

export const deleteEmployeeSuccess = (id) => {
  return {
    type: DELETE_EMPLOYEES_SUCCESS,
    payload: id
  };
};

export const deleteEmployeeError = (error) => {
  return {
    type: DELETE_EMPLOYEES_ERROR,
    payload: error
  };
};

export const postEmployeePending = () => {
  return {
    type: POST_EMPLOYEES_PENDING
  };
};

export const postEmployeeSuccess = (data) => {
  return {
    type: POST_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const postEmployeeError = (error) => {
  return {
    type: POST_EMPLOYEES_ERROR,
    payload: error
  };
};
export const putEmployeePending = () => {
  return {
    type: PUT_EMPLOYEES_PENDING
  };
};

export const putEmployeeSuccess = (data) => {
  return {
    type: PUT_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const putEmployeeError = (error) => {
  return {
    type: PUT_EMPLOYEES_ERROR,
    payload: error
  };
};

export const confirmModalOpen = (content) => {
  return {
    type: CONFIRM_MODAL_OPEN,
    payload: content
  };
};

export const confirmModalClose = () => {
  return {
    type: CONFIRM_MODAL_CLOSE
  };
};

export const messageModalOpen = (content) => {
  return {
    type: MESSAGE_MODAL_OPEN,
    payload: content
  };
};

export const messageModalClose = () => {
  return {
    type: MESSAGE_MODAL_CLOSE
  };
};

export const passwordModalOpen = () => {
  return {
    type: PASSWORD_MODAL_OPEN
  };
};

export const passwordModalClose = () => {
  return {
    type: PASSWORD_MODAL_CLOSE
  };
};
