import { getSuperAdminPending, getSuperAdminSuccess, getSuperAdminError } from './actions';

const getSuperAdmin = () => {
  return async (dispatch) => {
    dispatch(getSuperAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin`);
      const data = await response.json();
      dispatch(getSuperAdminSuccess(data.data));
    } catch (error) {
      dispatch(getSuperAdminError(error.toString()));
    }
  };
};

export default getSuperAdmin;
