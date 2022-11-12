import { getProjectsPending, getProjectsSuccess, getProjectsError } from './actions';

const getProjects = () => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      dispatch(getProjectsSuccess(data.data));
      return data.data;
    } catch (error) {
      dispatch(getProjectsError(error.toString()));
    }
  };
};

export default getProjects;
