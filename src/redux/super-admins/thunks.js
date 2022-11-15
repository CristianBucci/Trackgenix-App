import {
  getSuperAdminPending,
  getSuperAdminSuccess,
  getSuperAdminError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  postSuperAdminsError,
  updateSuperAdminsPending,
  updateSuperAdminsSuccess,
  updateSuperAdminsError,
  deleteSuperAdminPending,
  deleteSuperAdminSuccess,
  deleteSuperAdminError,
  getByIdSuperAdminPending,
  getByIdSuperAdminSuccess,
  getByIdSuperAdminError
} from './actions';

const getSuperAdmin = () => {
  return async (dispatch) => {
    dispatch(getSuperAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin`);
      const data = await response.json();
      if (response.status !== 200) {
        dispatch(getSuperAdminError(data.toString()));
      } else {
        dispatch(getSuperAdminSuccess(data.data));
      }
    } catch (error) {
      dispatch(getSuperAdminError(error.toString()));
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
    dispatch(deleteSuperAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`, {
        method: 'DELETE'
      });
      const json = await response.json();
      if (response.status !== 204) {
        dispatch(deleteSuperAdminError(json.toString()));
      } else {
        dispatch(deleteSuperAdminSuccess(json.data));
      }
    } catch (error) {
      dispatch(deleteSuperAdminError(error.toString()));
    }
  };
};

export const getByIdSuperAdmin = (id) => {
  return async (dispatch) => {
    dispatch(getByIdSuperAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`);
      const data = await response.json();
      if (response.status !== 200) {
        dispatch(getByIdSuperAdminError(data.msg.toString()));
      } else {
        dispatch(getByIdSuperAdminSuccess(data.data));
      }
    } catch (error) {
      dispatch(getByIdSuperAdminError(error.toString()));
    }
  };
};

export default getSuperAdmin;
