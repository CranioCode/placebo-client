import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../global/auth/auth-context";

import { Input, Button } from "../../components";

import "./OTP.scss";

const OTP = () => {
  const [otpValue, setOtpValue] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState([]);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  // Handling auth form data
  const handleOtpData = (data) => {
    setOtpValue(data[1]);
  };

  // Handling email data
  const handleEmail = (data) => {
    setEmail(data[1]);
  };

  const handleVerification = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/auth/otp/${role}/verify`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otpValue,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setMessage(data.message);
    } else {
      setMessage(data.error);
    }
  };

  const handleResend = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/auth/otp/${role}/new`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setMessage(data.message);
    } else {
      setMessage(data.error);
    }
  };

  useEffect(() => {
    if (authCtx.user._id) {
      setEmail(authCtx.user.email);
      setRole(authCtx.user.role);
    }
  }, []);

  return (
    <article className="flex justify-center items-center h-[80vh]">
      <section className="w-9/12 shadow-xl py-12 px-8">
        <h1 className="text-2xl text-center text-tertiary">Verify OTP</h1>
        <p>{message || "OTP has been sent to your registered email id."} </p>
        <div className="my-2">
          <Input
            type="options"
            options={[
              {
                name: "Doctor",
                value: "doctor",
                disabled: authCtx.user.role ? true : false,
              },
              {
                name: "User",
                value: "user",
                disabled: authCtx.user.role ? true : false,
              },
            ]}
            value={role}
            setValue={setRole}
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            name="Email"
            setValue={handleEmail}
          />
          <Input
            type="password"
            placeholder="OTP"
            value={otpValue}
            name="Password"
            setValue={handleOtpData}
          />
        </div>
        <div className="text-center m-auto w-1/4 flex justify-evenly">
          <Button text="Verify" outline func={handleVerification} />
          <Button text="Resend" outline func={handleResend} />
        </div>
      </section>
    </article>
  );
};

export default OTP;
