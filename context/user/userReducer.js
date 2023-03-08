import { GET_USER } from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
};

export default userReducer;
