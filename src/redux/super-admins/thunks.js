import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  getByIdSuperAdminsPending,
  getByIdSuperAdminsSucces,
  getByIdSuperAdminsError,
  postSuperAdminPending,
  postSuperAdminSuccess,
  postSuperAdminError,
  updateSuperAdminPending,
  updateSuperAdminSuccess,
  updateSuperAdminError,
  deleteSuperAdminPending,
  deleteSuperAdminSuccess,
  deleteSuperAdminError
} from './actions';

export const getSuperAdmins = () => {
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

export const getByIdSuperAdmins = (id) => {
  return async (dispatch) => {
    dispatch(getByIdSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`);
      const data = await response.json();
      if (response.status !== 200) {
        dispatch(getByIdSuperAdminsError(data.msg.toString()));
      } else {
        dispatch(getByIdSuperAdminsSucces(data.data));
      }
    } catch (error) {
      dispatch(getByIdSuperAdminsError(error.toString()));
    }
  };
};

export const createSuperAdmin = (input) => {
  return async (dispatch) => {
    dispatch(postSuperAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: input.name,
          lastName: input.lastName,
          email: input.email,
          password: input.password
        })
      });
      if (response.status == 201) {
        const data = await response.json();
        dispatch(postSuperAdminSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(postSuperAdminError(data.data));
      }
    } catch (error) {
      dispatch(postSuperAdminError(error.toString()));
    }
  };
};

export const updateSuperAdmin = (input, id) => {
  return async (dispatch) => {
    dispatch(updateSuperAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: input.name,
          lastName: input.lastName,
          email: input.email,
          password: input.password
        })
      });
      if (response.status == 200) {
        const data = await response.json();
        dispatch(updateSuperAdminSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(updateSuperAdminError(data.data));
      }
    } catch (error) {
      dispatch(updateSuperAdminError(error.toString()));
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
      if (response.status == 204) {
        dispatch(deleteSuperAdminSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteSuperAdminError(data.data));
      }
    } catch (error) {
      dispatch(deleteSuperAdminError(error.toString()));
    }
  };
};
