import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  postSuperAdminsError,
  updateSuperAdminsPending,
  updateSuperAdminsSuccess,
  updateSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError,
  getByIdSuperAdminsPending,
  getByIdSuperAdminsSuccess,
  getByIdSuperAdminsError
} from './actions';

const getSuperAdmins = () => {
  return async (dispatch) => {
    dispatch(getSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin`);
      const data = await response.json();
      if (response.status !== 200) {
        dispatch(getSuperAdminsError(data.toString()));
      } else {
        dispatch(getSuperAdminsSuccess(data.data));
      }
    } catch (error) {
      dispatch(getSuperAdminsError(error.toString()));
    }
  };
};

export const postSuperAdmins = (name, lastName, email, password) => {
  return async (dispatch) => {
    dispatch(postSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          lastName: lastName,
          email: email,
          password: password
        })
      });
      const data = await response.json();
      if (response.status !== 201) {
        dispatch(postSuperAdminsError(data.toString()));
      } else {
        dispatch(postSuperAdminsSuccess(data.data));
      }
    } catch (error) {
      dispatch(postSuperAdminsError(error.toString()));
    }
  };
};

export const updateSuperAdmins = (id, name, lastName, email, password) => {
  return async (dispatch) => {
    dispatch(updateSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          lastName: lastName,
          email: email,
          password: password
        })
      });
      const data = await response.json();
      if (response.status !== 200) {
        dispatch(updateSuperAdminsError(data.toString()));
      } else {
        dispatch(updateSuperAdminsSuccess(data.data));
      }
    } catch (error) {
      dispatch(updateSuperAdminsError(error.toString()));
    }
  };
};

export const deleteSuperAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`, {
        method: 'DELETE'
      });
      const json = await response.json();
      if (response.status !== 204) {
        dispatch(deleteSuperAdminsError(json.toString()));
      } else {
        dispatch(deleteSuperAdminsSuccess(json.data));
      }
    } catch (error) {
      dispatch(deleteSuperAdminsError(error.toString()));
    }
  };
};

export const getByIdSuperAdmins = (id) => {
  return async (dispatch) => {
    dispatch(getByIdSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`);
      const data = await response.json();
      if (response.status !== 200) {
        dispatch(getByIdSuperAdminsError(data.msg.toString()));
      } else {
        dispatch(getByIdSuperAdminsSuccess(data.data));
      }
    } catch (error) {
      dispatch(getByIdSuperAdminsError(error.toString()));
    }
  };
};

export default getSuperAdmins;
