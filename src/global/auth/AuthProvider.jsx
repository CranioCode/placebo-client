import { useEffect, useReducer } from "react";

import AuthContext from "./auth-context";

import { ERROR, FETCHING, LOGIN, LOGOUT } from "./auth-actions";

const AUTH_STATE = {
  user: {
    email: "",
    uid: "",
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
    //TODO User login
    return state;
  }

  if (action.type === LOGOUT) {
    //TODO User logout
    return state;
  }

  if (action.type === FETCHING) {
    //TODO User fetching
    return {
      ...state,
      error: action.payload,
      isUserFetching: false,
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
    //TODO check for cookies and login the user
  }, []);

  const handleLogin = (user) => {
    dispatchAuthState({ type: LOGIN, payload: user });
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
    logOut: handleLogout,
    handleFetching: handleUserFetching,
    setError: handleSetError,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
