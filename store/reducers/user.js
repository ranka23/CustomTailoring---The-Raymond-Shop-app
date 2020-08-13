import { GET_USER_FROM_DATABASE } from "../actions/user";

const initialState = {
  userDetails: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FROM_DATABASE:
      return {
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
};
