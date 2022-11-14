import { getAdminsPending, getAdminsSuccess, getAdminsError } from './actions';

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
