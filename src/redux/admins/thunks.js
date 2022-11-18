import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  createAdminsPending,
  createAdminsSuccess,
  createAdminsError,
  updateAdminsPending,
  updateAdminsSuccess,
  updateAdminsError,
  deleteAdminsPending,
  deleteAdminsSuccess,
  deleteAdminsError
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`);
      const json = await response.json();
      dispatch(getAdminsSuccess(json.data));
    } catch (error) {
      dispatch(getAdminsError(error.toString()));
    }
  };
};

export const createAdmins = (input) => {
  return async (dispatch) => {
    dispatch(createAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
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
        dispatch(createAdminsSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(createAdminsError(data.data));
      }
    } catch (error) {
      dispatch(createAdminsError(error.toString()));
    }
  };
};

export const updateAdmins = (input, id) => {
  return async (dispatch) => {
    dispatch(updateAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
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
        dispatch(updateAdminsSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(updateAdminsError(data.data));
      }
    } catch (error) {
      dispatch(updateAdminsError(error.toString()));
    }
  };
};

export const deleteAdmins = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: 'DELETE'
      });
      if (response.status == 204) {
        dispatch(deleteAdminsSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteAdminsError(data.data));
      }
    } catch (error) {
      dispatch(deleteAdminsError(error.toString()));
    }
  };
};
