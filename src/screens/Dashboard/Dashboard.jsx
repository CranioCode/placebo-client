import "./Dashboard.scss";
import { Button , AppointmentList } from "../../components"
import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../global/auth/auth-context";

const Dashboard = () => {

  const doctorId = useParams().id;
  const [appointments, setAppointments] = useState([]);

  const requiredAppointments = useRef([]);
  const [whichAppointments,setWhichAppointments] =useState(1);
  const [docStatus, setDocStatus] = useState(false);

  const {user} = useContext(AuthContext);

  const fetchAppointments = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/appointment/doctor/${id}`,{
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    })

    const data = await res.json();
    if(data.success){
      return data.message;
    }
  }
  useEffect(() => {
    // user?._id && (async () => {
    //   const doctor = await fetchDoctor(user._id);
    //   console.log(doctor);
    //   if(doctor?.available === "AVAILABLE"){
    //     setDocStatus(true);
    //   }else{
    //     setDocStatus(false);
    //   }
    // })();

    user?._id && setDocStatus(user.availability); 

  },[user._id])

  useEffect(() => {
    (async ()=> {
      const data = await fetchAppointments(doctorId);
      setAppointments(data);
      console.log(docStatus);
    })();
  },[user._id])

  const handleClick = (val) => {
    setWhichAppointments(val);
  }

  requiredAppointments.current = appointments.filter((elem) => {
    return elem.verified === whichAppointments;
  })

  return ( 
    <section id="dashboard" className="flex min-w-[100%] h-full">
      <div
        className="flex flex-col grow p-4 pr-0"
      >
        <div 
          id="appointmentNav"
          className="w-full h-auto flex border-b-4 border-solid border-tertiary p-0"
        >
          <Button
            text="Appointments"
            outline = {false}
            classList={[`m-[0] h-10 text-dark hover:bg-tertiary bg-[#F2FDFF] border-0 rounded-b-none ${
              whichAppointments===1 ? "bg-[#7098DA] text-white" : "hover:bg-tertiary"
            }`]}
            func = {() => handleClick(1)}
            />
          <Button
            text="Pending "
            outline = {false}
            classList={[`m-[0] h-10 text-dark hover:bg-tertiary bg-[#F2FDFF] border-0 rounded-b-none ${
              whichAppointments===0 ? "bg-[#7098DA] text-white" : "hover:bg-tertiary"
            }`]}
            func = {() => handleClick(0)}
          />
        </div>
        <AppointmentList list = {requiredAppointments.current} />
      </div>

      <div
        className="flex flex-col w-[20rem]"
      >
        <div
          className="flex flex-col grow mt-12"
        >
          <div
            className="text-[2rem] mx-auto text-green-400"
          >
            {docStatus}
          </div>
        </div>
      </div>
    </section>
    );
}

export default Dashboard;