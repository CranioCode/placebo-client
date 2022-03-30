import { createContext } from "react";

const AuthContext = createContext({
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
  logIn: (user) => {},
  loginSuccess: () => {},
  logOut: () => {},
  handleFetching: () => {},
  setError: (message) => {},
});

export default AuthContext;
