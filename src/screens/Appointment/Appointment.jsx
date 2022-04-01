import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AuthContext from "../../global/auth/auth-context";

import { Button, Input } from "../../components";

import { required } from "../../global/formValidation";
import { getDoctor } from "../../global/doctor-helpers";
import { createAppointment } from "../../global/appointment-helpers";

import "./Appointment.scss";

const Appointment = () => {
  const authCtx = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: authCtx.user.name,
    reason: "",
    email: authCtx.user.email,
    appointment: "",
  });
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleClose = () => {
    navigate({ pathname: "/" });
  };

  const handleFormData = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [data[0]]: data[1],
    }));
  };

  //? Fetch doctor here
  useEffect(() => {
    (async () => {
      const data = await getDoctor(id);
      if (data.success) {
        setDoctor(data.message);
      }
    })();
  }, [id]);

  const handleFormSubmission = async () => {
    const doctorId = doctor._id;
    const { email, reason, appointment } = formData;
    const start = new Date(appointment).getTime();
    const end = start + 3600000;
    const data = await createAppointment(doctorId, {
      email,
      doctor: doctorId,
      reason,
      start,
      end,
    });
    if (data.success) {
      navigate({ pathname: "/" });
    } else {
      setError(data.error);
    }
  };

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
          />
          <Input
            containerClasses={["my-1"]}
            name="reason"
            placeholder="Reason for visit"
            value={formData.reason}
            setValue={handleFormData}
          />
          <Input
            containerClasses={["my-1"]}
            name="email"
            placeholder="Email"
            value={formData.email}
            setValue={handleFormData}
          />
          <Input
            containerClasses={["my-1"]}
            placeholder="Appointment"
            name="appointment"
            type="datetime"
            value={formData.appointment}
            setValue={handleFormData}
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
