import React, { useReducer } from "react";
import UserContext from "./userContext";
import userReducer from "./userReducer";

function UserState(props) {
  let initialState = {
    user: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ user: state.user, loading: state.loading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
