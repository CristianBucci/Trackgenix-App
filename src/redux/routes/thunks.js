import { setRoutesReducer } from './actions';

export const setRoutes = (data) => {
  return (dispatch) => {
    dispatch(setRoutesReducer(data));
  };
};
