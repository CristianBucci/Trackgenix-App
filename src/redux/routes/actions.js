import { SET_ROUTES } from './constants';

export const setRoutesReducer = (data) => {
  return {
    type: SET_ROUTES,
    payload: data
  };
};
