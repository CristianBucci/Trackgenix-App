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
  deleteSuperAdminsError
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

export const createSuperAdmin = (input) => {
  return async (dispatch) => {
    dispatch(postSuperAdminsPending());
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
        dispatch(postSuperAdminsSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(postSuperAdminsError(data.data));
      }
    } catch (error) {
      dispatch(postSuperAdminsError(error.toString()));
    }
  };
};

export const updateSuperAdmins = (input, id) => {
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
          name: input.name,
          lastName: input.lastName,
          email: input.email,
          password: input.password
        })
      });
      if (response.status == 200) {
        const data = await response.json();
        console.log(data);
        dispatch(updateSuperAdminsSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(updateSuperAdminsError(data.data));
      }
    } catch (error) {
      console.log(error);
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
      if (response.status == 204) {
        dispatch(deleteSuperAdminsSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteSuperAdminsError(data.data));
      }
    } catch (error) {
      dispatch(deleteSuperAdminsError(error.toString()));
    }
  };
};
