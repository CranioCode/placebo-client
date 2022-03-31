import { useEffect, useReducer } from "react";

import AuthContext from "./auth-context";

import { ERROR, FETCHING, LOGIN, LOGINSUCCESS, LOGOUT } from "./auth-actions";

const AUTH_STATE = {
  user: {
    email: "",
    _id: "",
    role: "",
    name: "",
    dob: "",
    phoneNumber: "",
    profilePic: "",
    address: {
      city: "",
      state: "",
      pincode: "",
    },
  },
  isUserFetching: false,
  isLoggedIn: false,
  error: "",
};

const authReducer = (state, action) => {
  if (action.type === LOGIN) {
    return {
      ...state,
      user: {
        ...action.payload,
      },
      isLoggedIn: true,
      isUserFetching: false,
      error: "",
    };
  }

  if (action.type === LOGINSUCCESS) {
    return {
      ...state,
      isLoggedIn: true,
      isUserFetching: false,
      error: "",
    };
  }

  if (action.type === LOGOUT) {
    return {
      ...state,
      user: null,
      isLoggedIn: false,
      isUserFetching: false,
    };
  }

  if (action.type === FETCHING) {
    return {
      ...state,
      isUserFetching: true,
    };
  }

  if (action.type === ERROR) {
    return {
      ...state,
      error: action.payload,
      isUserFetching: false,
    };
  }

  return AUTH_STATE;
};

const AuthProvider = ({ children }) => {
  const [authState, dispatchAuthState] = useReducer(authReducer, AUTH_STATE);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/auth`, {
      credentials: "include",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatchAuthState({ type: LOGIN, payload: data.message });
        } else {
          dispatchAuthState({ type: ERROR, payload: data.error });
        }
      })
      .catch((error) => {
        dispatchAuthState({ type: ERROR, payload: "SERVER ERROR" });
      });
  }, []);

  const handleLogin = (user) => {
    dispatchAuthState({ type: LOGIN, payload: user });
  };

  const handleLoginSuccess = (msg) => {
    dispatchAuthState({ type: LOGINSUCCESS });
  };

  const handleLogout = () => {
    dispatchAuthState({ type: LOGOUT });
  };

  const handleUserFetching = () => {
    dispatchAuthState({ type: FETCHING });
  };

  const handleSetError = (msg) => {
    dispatchAuthState({ type: ERROR, payload: msg });
  };

  const authContext = {
    user: authState.user,
    isLoggedIn: authState.isLoggedIn,
    isUserFetching: authState.isUserFetching,
    error: authState.error,
    logIn: handleLogin,
    loginSuccess: handleLoginSuccess,
    logOut: handleLogout,
    handleFetching: handleUserFetching,
    setError: handleSetError,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
