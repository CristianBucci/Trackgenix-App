import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  getByIdTaskPending,
  getByIdTaskSuccess,
  getByIdTaskError,
  deleteTasksSuccess,
  deleteTasksError,
  createTasksSuccess,
  createTasksError,
  updateTasksSuccess,
  updateTasksError
} from './actions';

export const getTasks = () => {
  return async (dispatch) => {
    dispatch(getTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      dispatch(getTasksSuccess(data.data));
    } catch (error) {
      dispatch(getTasksError(error.toString()));
    }
  };
};

export const getByIdTask = (id) => {
  return async (dispatch) => {
    dispatch(getByIdTaskPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
      const data = await response.json();
      if (response.status == 200) {
        dispatch(getByIdTaskSuccess(data.data));
      } else {
        const data = await response.json();
        dispatch(getByIdTaskError(data.msg.toString()));
      }
    } catch (error) {
      dispatch(getByIdTaskError(error.toString()));
    }
  };
};

export const deleteTasks = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        dispatch(deleteTasksSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteTasksError(data.data));
      }
    } catch (error) {
      dispatch(deleteTasksError(error.toString()));
    }
  };
};

export const createTask = (newTask) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status === 201) {
        dispatch(createTasksSuccess());
      } else {
        const data = await response.json();
        dispatch(createTasksError(data.data));
      }
    } catch (error) {
      dispatch(createTasksError(error.toString()));
    }
  };
};

export const updateTask = (data, id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ description: data }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status === 200) {
        dispatch(updateTasksSuccess(data, id));
      } else {
        const data = await response.json();
        dispatch(updateTasksError(data.data));
      }
    } catch (error) {
      dispatch(updateTasksError(error.toString()));
    }
  };
};
