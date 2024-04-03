function Reducer(state, action) {
  switch (action.type) {
    case "REFRESH_STATE":
      return { ...state, error: "", data: {} };
    case "REQUESTING":
      return { ...state, loading: true };
    case "REQUEST_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        token: action.payload?.access_token,
        userInfo: action.payload?.user,
        initialLoading: false,
        error: "",
      };
    case "AUTH_UNAUTHORIZED":
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        initialLoading: false,
        token: "",
        userInfo: {},
        error: "",
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        token: "",
        userInfo: {},
      };
  }
}

export default Reducer;
