import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../global/auth/auth-context";

import { Button, Input } from "../../components";

import { required } from "../../global/formValidation";

import "./Appointment.scss";

const Appointment = ({ doctor }) => {
  const authCtx = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: authCtx.user.name,
    reason: "",
    email: authCtx.user.email,
    phone: authCtx.user.phoneNumber,
    appointment: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate({ pathname: "/" });
  };

  const handleFormData = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [data[0]]: data[1],
    }));
  };

  const handleFormSubmission = () => {};

  return (
    <section className="flex justify-center items-center h-[83vh]">
      <div className="w-11/12 shadow-xl p-4">
        <div className="flex justify-between">
          <h1 className="text-4xl">Book Appointment</h1>
          <div className="cursor-pointer" onClick={handleClose}>
            <i className="far fa-times text-tertiary text-2xl"></i>
          </div>
        </div>
        <div className="flex items-center w-full bg-quaternary p-2">
          <div className="w-[10%] rounded-full">
            <img
              src={doctor?.profilePic}
              alt={doctor?.name}
              className="w-[80px] rounded-full"
            />
          </div>
          <div className="w-[70%]">
            <h2 className="text-xl text-tertiary">{doctor?.name}</h2>
            <p className="italic">{doctor?.specialization}</p>
          </div>
          <div className="w-[20%]">
            <h2 className="text-3xl text-tertiary font-bold">
              {" "}
              &#8377; {doctor?.charge}
            </h2>
          </div>
        </div>
        <div className="mt-2 text-rose-500">{error ? error : ""}</div>
        <div className="mt-2">
          <Input
            containerClasses={["my-1"]}
            name="name"
            placeholder="Name"
            value={formData.name}
            setValue={handleFormData}
            verify={required}
          />
          <Input
            containerClasses={["my-1"]}
            name="reason"
            placeholder="Reason for visit"
            value={formData.reason}
            setValue={handleFormData}
            verify={required}
          />
          <Input
            containerClasses={["my-1"]}
            name="email"
            placeholder="Email"
            value={formData.email}
            setValue={handleFormData}
            verify={required}
          />
          <Input
            containerClasses={["my-1"]}
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            setValue={handleFormData}
            verify={required}
          />
          <Input
            containerClasses={["my-1"]}
            placeholder="Appointment"
            name="appointment"
            type="date"
            value={formData.appointment}
            setValue={handleFormData}
            verify={required}
          />
        </div>
        <div className="my-2">
          <Button
            text="Book"
            outline
            classList={["mr-2"]}
            func={handleFormSubmission}
          />
          <Button
            text="Cancel"
            outline
            classList={["mr-2"]}
            func={handleClose}
          />
        </div>
      </div>
    </section>
  );
};

export default Appointment;
