import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  createProjectPending,
  createProjectSuccess,
  createProjectError,
  updateProjectPending,
  updateProjectSuccess,
  updateProjectError,
  deleteProjectError,
  deleteProjectSuccess,
  deleteProjectPending,
  getByIdProjectsPending,
  getByIdProjectsSuccess,
  getByIdProjectsError
} from './actions';

export const getProjects = (token) => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        headers: { token }
      });
      const data = await response.json();
      dispatch(getProjectsSuccess(data.data));
    } catch (error) {
      dispatch(getProjectsError(error.toString()));
    }
  };
};

export const getByIdProjects = (id, token) => {
  return async (dispatch) => {
    dispatch(getByIdProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        headers: { token }
      });
      const data = await response.json();
      if (response.status == 200) {
        dispatch(getByIdProjectsSuccess(data.data));
      } else {
        dispatch(getByIdProjectsError(data.msg.toString()));
      }
    } catch (error) {
      dispatch(getByIdProjectsError(error.toString()));
    }
  };
};

export const createProject = (input, employees, token) => {
  return async (dispatch) => {
    dispatch(createProjectPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: input.name,
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
          clientName: input.clientName,
          employees
        })
      });
      if (response.status == 201) {
        const data = await response.json();
        dispatch(createProjectSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(createProjectError(data.data));
      }
    } catch (error) {
      dispatch(createProjectError(error.toString()));
    }
  };
};

export const updateProject = (id, input, employees, token) => {
  return async (dispatch) => {
    dispatch(updateProjectPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: input.name,
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
          clientName: input.clientName,
          employees
        })
      });
      if (response.status == 200) {
        const data = await response.json();
        dispatch(updateProjectSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(updateProjectError(data.data));
      }
    } catch (error) {
      dispatch(updateProjectError(error.toString()));
    }
  };
};

export const deleteProject = (id, token) => {
  return async (dispatch) => {
    dispatch(deleteProjectPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          token,
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status == 204) {
        dispatch(deleteProjectSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteProjectError(data.data));
      }
    } catch (error) {
      dispatch(deleteProjectError(error.toString()));
    }
  };
};
