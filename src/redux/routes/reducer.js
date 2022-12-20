import { SET_ROUTES } from './constants';

const INITIAL_STATE = { routes: [] };

const routesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ROUTES:
      return {
        ...state,
        routes: action.payload
      };
    default:
      return state;
  }
};

export default routesReducer;
