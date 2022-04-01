import { useState, useEffect } from "react";
import { Button } from "../../components"
import "./AppointmentList.scss"

const AppointmentList = ({list}) => {

  const [appointments,setAppointments] = useState();

  const fetchPatient = async (uid) => {
    const patient = await fetch(`${import.meta.env.VITE_BACKEND_API}/user/${uid}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const patientData = (await patient.json()).message;
    return patientData;
  };

  useEffect(() => {
    (async () => {
      const appointments = await Promise.all(
        list.map(async (elem) => {
          const patientData = await fetchPatient(elem.patient);
          const { name } = patientData;
          return {...elem,patientName: name};
        })
      );
      setAppointments(appointments);
    })();
  }, [list]);

  const handleClick = async (id) => {
    await fetch(`${import.meta.env.VITE_BACKEND_API}/appointment/confirm/${id}`, {
      credentials: "include",
      body: JSON.stringify({
        confirmationStatus: 1,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    list = [...list];
  }

  return (  
    <div
      id="appointmentList"
      className="grow relative w-full bg-back border-tertiary overflow-y-scroll overflow-x-hidden"
    >
      {appointments && appointments.map((elem) => (
        <div
          className="flex w-full h-16 bg-back grow content-center items-center p-2 text-xl font-bold whitespace-nowrap overflow-hidden border-[0.01rem] border-dark border-solid border-opacity-[0.4] hover:bg-quinary transition-colors border-t-0"
          key = {elem._id}
        >
          <div>{elem.patientName}</div>
          <div
            className="ml-auto"
          > 
            {`${(new Date(elem.start)).toLocaleTimeString(navigator,{hour: "2-digit", minute: "2-digit"})}\t-\t${(new Date(elem.end)).toLocaleTimeString(navigator,{hour: "2-digit", minute: "2-digit"})}`}
          </div>
          {elem.verified===0 && <Button
            text="Confirm"
            size="small"
            classList={[`ml-2 h-8 border-solid border-[0.05rem] border-tertiary text-dark hover:bg-tertiary bg-[#F2FDFF] border-0`]}
            func = {() => handleClick(elem._id)}
          />}
        </div>
      ))}
    </div>
  );
}

export default AppointmentList;