import {
  getSuperAdminPending,
  getSuperAdminSuccess,
  getSuperAdminError,
  deleteSuperAdminPending,
  deleteSuperAdminSuccess,
  deleteSuperAdminError
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

export default getSuperAdmin;
