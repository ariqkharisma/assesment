import React from "react";
import axios from "axios";
import Reducer from "./Reducer";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

const initialState = {
  initialLoading: true,
  loading: false,
  isLoggedIn: false,
  error: "",
  userInfo: {},
  token: "",
  data: {},
};

export function Provider({ children }) {
  const [state, dispatch] = React.useReducer(Reducer, initialState);
  const requesting = () => {
    return { type: "REQUESTING" };
  };

  const requestSuccess = (data) => {
    return { type: "REQUEST_SUCCESS", payload: data };
  };

  const authSuccess = (data) => {
    return { type: "AUTH_SUCCESS", payload: data };
  };

  const authLogout = () => {
    return { type: "AUTH_LOGOUT" };
  };

  const requestFailure = (error) => {
    return { type: "REQUEST_FAILURE", payload: error };
  };

  const login = async (requestBody) => {
    dispatch(requesting());
    try {
      const { data } = await axios.post("/api/auth/login", requestBody);
      dispatch(authSuccess(data.data));
      localStorage.setItem("auth_token", data.data.access_token);
      toast.success("Login Success");
    } catch (error) {
      console.log(error);
      dispatch(requestFailure(error.response?.data.message));
    }
  };

  const register = async (requestBody) => {
    dispatch(requesting());
    try {
      const { data } = await axios.post("/api/auth/register", requestBody);
      dispatch(requestSuccess({}));
      toast.success("Register Success");
    } catch (error) {
      console.log(error);
      dispatch(requestFailure(error.response?.data.message));
    }
  };

  const logout = () => {
    dispatch(requesting());
    localStorage.removeItem("auth_token");
    dispatch(authLogout());
    toast.success("Logout Success");
  };

  const fetchData = async (apiURL, dataId) => {
    dispatch(requesting());
    try {
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization: state.token ? `Bearer ${state.token}` : null,
        },
      });
      dispatch(requestSuccess({ [dataId]: data.data }));
    } catch (error) {
      console.log(error);
      dispatch(requestFailure(error.response?.data.message));
    }
  };

  const postData = async (apiURL, requestBody) => {
    dispatch(requesting());
    try {
      const { data } = await axios.post(apiURL, requestBody, {
        headers: {
          Authorization: state.token ? `Bearer ${state.token}` : null,
        },
      });
      dispatch(requestSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(requestFailure(error.response?.data.message));
    }
  };

  const updateData = async (apiURL, requestBody) => {
    dispatch(requesting());
    try {
      const response = await axios.put(apiURL, requestBody, {
        headers: {
          Authorization: state.token ? `Bearer ${state.token}` : null,
        },
      });
      dispatch(requestSuccess({}));
      toast.success("Update Success");
    } catch (error) {
      console.log(error);
      dispatch(requestFailure(error.response?.data.message));
      toast.error(error.response?.data.message);
    }
  };

  const deleteData = async (apiURL) => {
    dispatch(requesting());
    try {
      const response = await axios.delete(apiURL, {
        headers: {
          Authorization: state.token ? `Bearer ${state.token}` : null,
        },
      });
      dispatch(requestSuccess({}));
      toast.success("Delete Success");
    } catch (error) {
      console.log(error);
      dispatch(requestFailure(error.response?.data.message));
      toast.error('Delete Failed: ' +error.response?.data.message);
    }
  };

  const checkToken = async (token) => {
    dispatch(requesting());
    try {
      const { data } = await axios.get(`/api/auth/${token}`);
      dispatch(authSuccess(data.data));
    } catch (error) {
      console.log(error);
      localStorage.removeItem("auth_token");
      dispatch({type: "AUTH_UNAUTHORIZED"});
    }
  };

  const refreshState = () => {
    dispatch({ type: "REFRESH_STATE" });
  }

  React.useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      checkToken(token);
    } else {
      dispatch({ type: "AUTH_UNAUTHORIZED" });
    }
  }, []);

  return state.initialLoading ? (
    <Loading />
  ) : (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        fetchData,
        postData,
        updateData,
        deleteData,
        refreshState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useGlobalContext() {
  return React.useContext(AuthContext);
}
