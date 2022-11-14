import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectError,
  deleteProjectSuccess,
  deleteProjectPending
} from './actions';

const getProjects = () => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      dispatch(getProjectsSuccess(data.data));
    } catch (error) {
      dispatch(getProjectsError(error.toString()));
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(deleteProjectPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(deleteProjectSuccess(id));
    } catch (error) {
      dispatch(deleteProjectError(error.toString()));
    }
  };
};

export default getProjects;
