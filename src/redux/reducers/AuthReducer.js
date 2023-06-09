import * as Actions from '../actions/ActionTypes';

const initialState = {
  googleSuccess: null,
  authSuccess: null,
  error: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SIGN_IN: {
      return {...state, googleSuccess: action.payload};
    }
    case Actions.AUTH: {
      return {...state, authSuccess: action.payload};
    }
    case Actions.RESET_AUTH: {
      return initialState;
    }
    case Actions.SIGNIN_ERROR: {
      return {
        ...state,
        error: action.payload,
        googleSuccess: null,
        authSuccess: null,
      };
    }
    default:
      return state;
  }
};
export default AuthReducer;
