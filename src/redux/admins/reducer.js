import { GET_ADMINS_ERROR, GET_ADMINS_PENDING, GET_ADMINS_SUCCESS } from './constants';

const INITIAL_STATE = {
  isloading: false,
  error: '',
  list: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isloading: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        isloading: false,
        error: '',
        list: action.payload
      };
    case GET_ADMINS_ERROR:
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
