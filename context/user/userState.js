import axios from "axios";
import React, { useReducer } from "react";
import setAuthToken from "../../utils/setAccessToken";
import { GET_USER } from "../types";
import UserContext from "./userContext";
import userReducer from "./userReducer";

function UserState(props) {
  let initialState = {
    user: null,
    loading: false,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  const getUser = async (success = null, error = null) => {
    try {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.get("/api/getUser", config);
      if (res.data.status) {
        dispatch({ type: GET_USER, payload: res.data.data });
        if (success) {
          success();
        }
      } else {
        localStorage.removeItem("accessToken");
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };

  const login = async (data, success = null, error = null) => {
    try {
      const res = await axios.post("/api/getUser", { ...data }, config);
      if (res.data.status) {
        localStorage.setItem("accessToken", res.data.data);
        if (success) {
          success();
        }
      } else {
        localStorage.removeItem("accessToken");
        if (error) {
          error(res.data.msg);
        }
      }
    } catch (err) {
      if (error) {
        error(err);
      }
    }
  };
  return (
    <UserContext.Provider
      value={{ user: state.user, loading: state.loading, getUser, login }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
