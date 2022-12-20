import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getByIdAdminsPending,
  getByIdAdminsSuccess,
  getByIdAdminsError,
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

export const getAdmins = (token) => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
        headers: { token }
      });
      const json = await response.json();
      dispatch(getAdminsSuccess(json.data));
    } catch (error) {
      dispatch(getAdminsError(error.toString()));
    }
  };
};

export const getByIdAdmin = (id, token) => {
  return async (dispatch) => {
    dispatch(getByIdAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        headers: { token }
      });
      const data = await response.json();
      if (response.status == 200) {
        dispatch(getByIdAdminsSuccess(data.data));
      } else {
        const data = await response.json();
        dispatch(getByIdAdminsError(data.msg.toString()));
      }
    } catch (error) {
      dispatch(getByIdAdminsError(error.toString()));
    }
  };
};

export const createAdmins = (input, token) => {
  return async (dispatch) => {
    dispatch(createAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
        method: 'POST',
        headers: {
          token,
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

export const updateAdmins = (input, id, token) => {
  return async (dispatch) => {
    dispatch(updateAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: 'PUT',
        headers: {
          token,
          Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(input)
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

export const deleteAdmins = (id, token) => {
  return async (dispatch) => {
    dispatch(deleteAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: 'DELETE',
        headers: {
          token,
          'Content-type': 'application/json; charset=UTF-8'
        }
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
