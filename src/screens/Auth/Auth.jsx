import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";

// Context
import AuthContext from "../../global/auth/auth-context";

// Utils
import { login } from "../../global/auth-helper";
import {
  dateValidation,
  emailValidation,
  passwordValidation,
  registrationNumberValidation,
  required,
  yearValidation,
} from "../../global/formValidation";

import "./Auth.scss";

// Import components
import { Input, Button } from "../../components";

const DEFAULT_FORM_STATE = {
  fname: "",
  lname: "",
  email: "",
  dob: "",
  dor: "",
  regNo: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  // States
  const [authState, setAuthState] = useState({
    isDoctor: false,
    isLogin: true,
  });
  const [authFormData, setAuthFormData] = useState(DEFAULT_FORM_STATE);
  const [error, setError] = useState(null);

  // Search Parameter
  const [searchParams, setSearchParams] = useSearchParams();

  // Context
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    searchParams.get("type") === "register"
      ? setAuthState((prevAuthState) => ({
          ...prevAuthState,
          isLogin: false,
        }))
      : setAuthState((prevAuthState) => ({
          ...prevAuthState,
          isLogin: true,
        }));
  }, [searchParams]);

  const handleChangeRole = () => {
    setAuthState((prevAuthState) => ({
      ...prevAuthState,
      isDoctor: !prevAuthState.isDoctor,
    }));
  };

  const handleChangeAuth = () => {
    // Updating Query Params
    const newQueryParams = new URLSearchParams();

    if (authState.isLogin) {
      newQueryParams.set("type", "register");
    } else {
      newQueryParams.set("type", "login");
    }

    setSearchParams(newQueryParams);

    setAuthState((prevAuthState) => ({
      ...prevAuthState,
      isLogin: !prevAuthState.isLogin,
    }));
  };

  // Handling auth form data
  const handleAuthData = (data) => {
    setAuthFormData((prevAuthData) => ({
      ...prevAuthData,
      [data[0]]: data[1],
    }));
  };

  // Handling authentication and error state
  const handleAuthentication = async () => {
    console.log("I AM HERE");
    //? Authentication using Passport
    authCtx.handleFetching();
    let data;
    try {
      if (authState.isDoctor) {
        if (authState.isLogin) {
          data = await login({
            email: authFormData.email,
            password: authFormData.password,
            role: "doctor",
          });
        } else {
          // data = await doctorSignUp(authFormData);
        }
        if (data.success) {
          authCtx.logIn({ ...data.data, role: "doctor" });
        } else {
          authCtx.setError(data.error);
        }
      } else {
        if (authState.isLogin) {
          data = await login({
            email: authFormData.email,
            password: authFormData.password,
            role: "user",
          });
        } else {
          // data = await userSignUp(authFormData);
        }
        if (data.success) {
          authCtx.logIn({ ...data.data, role: "user" });
        } else {
          authCtx.setError(data.error);
        }
      }
    } catch (error) {
      authCtx.setError(error.message);
    }
  };

  useEffect(() => {
    if (
      !authState.isLogin &&
      authFormData.password !== authFormData.confirmPassword
    ) {
      setError("Password and Confirm Password doesn't match");
    }
  }, [authFormData, authState]);

  //? Changing the error state when there is error in global state
  // useEffect(() => {
  //   if (authCtx.error) {
  //     setError(authCtx.error);
  //   }
  // }, [authCtx.error]);

  return (
    <section
      className="auth w-11/12 mt-[1vh] h-4/5 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[1vh] flex bg-back"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleAuthentication();
        }
      }}
    >
      <div className="auth-left h-full w-[30%] bg-secondary text-center select-none">
        <h2 className="mx-auto my-[4vh] w-3/5 text-tertiary text-4xl font-bold">
          Welcome {authState.isLogin ? "back" : ""} to placebo
        </h2>
        <img
          className="m-auto w-11/12"
          src="src/img/assets/illustration-1.png"
          alt="Doctor"
        />
        <span className="block text-lg w-4/5 my-[3vh] mx-auto">
          A few clicks away from a healthy lifestyle.
        </span>
      </div>
      <div className="auth-right">
        <div className="auth-right-header m-[4vh] relative flex justify-between text-tertiary">
          <span className="absolute left-[4vh] top-[100%] text-rose-500">
            {error ? error : ""}
          </span>
          <h1 className="text-4xl font-bold inline-block">
            {authState.isDoctor ? "Doctor " : "User "}
            {authState.isLogin ? "Login " : "Registration "}
          </h1>
          <span
            className="inline-block cursor-pointer italic text-lg select-none"
            onClick={handleChangeRole}
          >
            Click here for {authState.isDoctor ? "User " : "Doctor "}
            {authState.isLogin ? "Login " : "Registration "}
          </span>
        </div>
        <div className="auth-right-inputs px-4 flex flex-wrap justify-center">
          {!authState.isLogin && (
            <>
              <Input
                type="text"
                width="w-[45%]"
                name="fname"
                placeholder="First Name"
                containerClasses={["mx-2 mb-4"]}
                value={authFormData.fname}
                setValue={handleAuthData}
                verify={required}
                setVerificationError={setError}
              />
              <Input
                type="text"
                width="w-[45%]"
                name="lname"
                placeholder="Last Name"
                containerClasses={["mx-2 mb-4"]}
                value={authFormData.lname}
                setValue={handleAuthData}
                verify={required}
                setVerificationError={setError}
              />
            </>
          )}
          <Input
            type="text"
            width={authState.isLogin ? "w-[90%]" : "w-[45%]"}
            name="email"
            placeholder="Email"
            containerClasses={["mx-2 mb-4"]}
            value={authFormData.email}
            setValue={handleAuthData}
            verify={emailValidation}
            setVerificationError={setError}
          />
          {!authState.isLogin && (
            <Input
              type="date"
              width="w-[45%]"
              placeholder="Date of Birth"
              name="dob"
              containerClasses={["mx-2 mb-4"]}
              value={authFormData.dob}
              setValue={handleAuthData}
              verify={dateValidation}
              setVerificationError={setError}
            />
          )}
          {authState.isDoctor && !authState.isLogin && (
            <>
              <Input
                type="text"
                width="w-[45%]"
                name="regNo"
                placeholder="Registration No."
                containerClasses={["mx-2 mb-4"]}
                value={authFormData.regNo}
                setValue={handleAuthData}
                verify={registrationNumberValidation}
                setVerificationError={setError}
              />
              <Input
                type="text"
                width="w-[45%]"
                placeholder="Year of Registration"
                name="dor"
                containerClasses={["mx-2 mb-4"]}
                value={authFormData.dor}
                setValue={handleAuthData}
                verify={yearValidation}
                setVerificationError={setError}
              />
            </>
          )}
          <Input
            type="password"
            width={authState.isLogin ? "w-[90%]" : "w-[45%]"}
            name="password"
            placeholder="Password"
            containerClasses={["mx-2 mb-4"]}
            value={authFormData.password}
            setValue={handleAuthData}
            verify={passwordValidation}
            setVerificationError={setError}
          />
          {!authState.isLogin && (
            <Input
              type="password"
              width="w-[45%]"
              name="confirmPassword"
              placeholder="Confirm Password"
              containerClasses={["mx-2 mb-4"]}
              value={authFormData.confirmPassword}
              setValue={handleAuthData}
              verify={passwordValidation}
              setVerificationError={setError}
            />
          )}
        </div>
        <div className="auth-right-button mt-[2vh] flex flex-col justify-center items-center">
          <Button
            text={authState.isLogin ? "Login" : "Register"}
            outline
            func={handleAuthentication}
            disabled={error}
          />
          <div className="mt-[2vh] text-lg">
            {authState.isLogin ? "Don't " : "Already "} have an account?{" "}
            <span
              onClick={handleChangeAuth}
              className="italic font-bold cursor-pointer underline text-tertiary"
            >
              {authState.isLogin ? "Register" : "Login"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
