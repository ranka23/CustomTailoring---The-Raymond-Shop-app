import {
  LOGOUT,
  CREATE_USER_IN_DATABASE,
  AUTHENTICATE,
  SET_DID_TRY_AL,
  GET_USER_FROM_DATABASE,
} from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
  userNodeId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };

    
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };

    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };

    case CREATE_USER_IN_DATABASE:
      return {
        userNodeId: action.userId,
      };

    default:
      return state;
  }
};