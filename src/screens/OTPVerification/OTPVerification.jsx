import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components";

import "./OTPVerification.scss";

const OTPVerification = () => {
  const [message, setMessage] = useState("Verifying...");
  const [isSuccess, setIsSuccess] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // const { token } = useParams();

  // Authentication Context
  // const authCtx = useContext(AuthContext);

  const handleRequestOTP = async () => {
    //? Request new OTP here
    // const data = await requestNewOtp(user, authCtx.user.isDoctor);
    // if (data.success) {
    //   setMessage(data.data);
    //   setIsSuccess(true);
    // } else {
    //   setBackendError(data.data);
    // }
  };

  //? Check whether user signed in and then verify OTP
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     const [uid] = token.split("_");
  //     if (!user) {
  //       setError("You are not logged in. Please login and then verify.");
  //     } else if (uid !== user.uid) {
  //       setError("Invalid user. Please try again.");
  //     } else {
  //       setUser(user.uid);
  //       const data = await verifyOtp(token, authCtx.user.isDoctor);
  //       if (!data.success) {
  //         setBackendError(data.data);
  //       } else {
  //         setIsSuccess(true);
  //         setMessage(data.data);
  //       }
  //     }
  //   });
  // }, [token]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    }
  }, [isSuccess, navigate]);

  return (
    <section className="otp h-[80vh] flex justify-center items-center">
      <div className="box border-2 h-3/5 w-3/5 bg-back rounded-[1vh] flex-col justify-center items-center">
        <div
          className={`${
            backendError ? "h-4/6" : "h-full"
          } flex justify-center items-center`}
        >
          {isSuccess && (
            <img className="h-2/6 mr-4" src="/img/assets/tick.png" alt="Done" />
          )}
          {!error && (
            <span className="text-tertiary text-3xl font-bold">{message}</span>
          )}
          {error && (
            <>
              <img
                className="h-2/6 mr-4"
                src="/img/assets/cross.png"
                alt="Done"
              />
              <span className="text-rose-500 text-3xl font-bold">{error}</span>
            </>
          )}
        </div>
        {backendError && (
          <div className="h-2/6 flex justify-center items-start">
            <Button outline text="Request new OTP" func={handleRequestOTP} />
          </div>
        )}
      </div>
    </section>
  );
};

export default OTPVerification;
