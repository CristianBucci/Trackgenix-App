import { GET_EMPLOYEES_ERROR, GET_EMPLOYEES_PENDING, GET_EMPLOYEES_SUCCESS } from './constants';

const INITIAL_STATE = {
  isloading: false,
  error: '',
  list: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isloading: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isloading: false,
        error: '',
        list: action.payload
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isloading: false,
        error: action.payload,
        list: []
      };
    default:
      return state;
  }
};

export default reducer;
