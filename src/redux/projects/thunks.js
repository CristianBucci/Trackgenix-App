import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  createProjectPending,
  createProjectSuccess,
  createProjectError,
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

export const createProject = async (project) => {
  return async (dispatch) => {
    dispatch(createProjectPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      });
      const data = await response.json();
      dispatch(createProjectSuccess(data.data));
    } catch (error) {
      dispatch(createProjectError(error.toString()));
    }
  };
};
export default getProjects;
