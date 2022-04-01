import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchTestimonials, getDoctor } from "../../global/doctor-helpers";
import { getUser } from "../../global/user-helpers";

import { Accordion, Button } from "../../components";
import AuthContext from "../../global/auth/auth-context";
import { getAppointment } from "../../global/appointment-helpers";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [appointments, setAppointments] = useState([]);
  // const [highlights, setHighlights] = useState([]);

  const authCtx = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();

  //? Fetch user here
  useEffect(() => {
    (async () => {
      let data;
      if (authCtx.user?.role === "user" && authCtx.user?._id === id) {
        data = await getUser(id);
      } else {
        data = await getDoctor(id);
      }
      if (data.success) {
        setUser(data.message);
      }
    })();
  }, [id]);

  const handleBookAppointment = () => {
    if (authCtx.user?.role === "user") {
      navigate({ pathname: `/appointment/${user?._id}` });
    }
  };

  useEffect(() => {
    (async () => {
      if (user?._id) {
        const testimonialData = await fetchTestimonials(user._id);
        if (testimonialData.success) {
          setTestimonials(testimonialData.message);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!(authCtx.user?.role === "user" && user?.registrationNumber)) {
        const res = await getAppointment(authCtx.user?._id);
        if (res.success) {
          setAppointments(res.message);
        }
      }
    })();
  }, []);

  return (
    <section className="p-[8vh] flex">
      <article className="w-1/3">
        <div className="w-5/6">
          <img
            src={user?.profilePic}
            alt={user?.name}
            className="rounded-xl object-cover"
          />
        </div>
        <div className="mt-[6vh]">
          <div className="border-b-2 mr-[5vw] border-tertiary">
            <h1 className="text-3xl">Contacts</h1>
          </div>
          <div className="p-[2vh] pr-[5vw]">
            <div className="relative mb-[1vh]">
              <span>Phone</span>
              <div className="absolute top-0 right-0 text-tertiary">
                {user?.phoneNumber}
              </div>
            </div>
            <div className="relative mb-[1vh]">
              <span>Email</span>
              <div className="absolute top-0 right-0 text-tertiary">
                {user?.email}
              </div>
            </div>
            <div className="relative mb-[1vh]">
              <span>Address</span>
              <div className="absolute top-0 right-0 text-tertiary">
                <address>{user?.address}</address>
              </div>
            </div>
          </div>
        </div>
      </article>
      {authCtx.user?.role === "user" && user?.registrationNumber ? (
        <article className="w-2/3">
          <div>
            <div className="text-[6vh] mb-6 border-b-2 border-primary relative">
              {user?.name}{" "}
              <span
                className={`text-xs border-[1px] absolute top-[20%] px-1 ml-4 italic ${
                  user?.doctorVerified
                    ? "text-green-500 border-green-500"
                    : "text-rose-500 border-rose-500"
                }`}
              >
                Doctor {!user?.doctorVerified && "not"} verified
              </span>
            </div>
            <div className="text-xl flex flex-wrap">
              {/* <div className="flex-[50%] mb-4">
              <div className="inline-block mr-2">RATINGS :</div>
              <span className="text-tertiary font-bold">
                {user?.rating?.value}
              </span>
            </div> */}
              <div className="flex-[50%] mb-4">
                <div className="inline-block mr-2">REG NO. :</div>
                <span className="text-tertiary font-bold">
                  {user?.registrationNumber}
                </span>
              </div>
              <div className="flex-[50%] mb-4">
                <div className="inline-block mr-2">CHARGE/HOUR :</div>
                <span className="text-tertiary font-bold">
                  &#8377; {user?.charge}
                </span>
              </div>
              <div className="flex-[50%] mb-4">
                <div className="inline-block mr-2">SPECIALIZATIONS :</div>
                <span className="text-tertiary font-bold">
                  {user?.specializations.map((sp) => `${sp}, `)}
                </span>
              </div>
              <div className="flex-[50%] mb-4">
                <div className="inline-block mr-2">QUALIFICATIONS :</div>
                <span className="text-tertiary font-bold">
                  {user?.qualifications.map((qua) => `${qua}, `)}
                </span>
              </div>
              {authCtx.user?._id !== user?._id && (
                <div className="flex-[50%] mb-4">
                  <Button
                    text="Book Appointment"
                    outline
                    func={handleBookAppointment}
                  />
                </div>
              )}
            </div>
            <div className="text-xl mb-6">
              <p>{user?.description}</p>
            </div>
          </div>
          {/* <div className="accordion">Accordion Here</div> */}
          <Accordion
            data={[
              {
                title: "Testimonial",
                body: (
                  <div>
                    {testimonials.map((tes) => (
                      <div key={tes._id}>
                        <p>tes.body</p>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: "Patients",
                body: "Patients",
              },
              {
                title: "Highlights",
                body: "Highlights",
              },
            ]}
          />
        </article>
      ) : (
        <article className="w-[70%]">
          {appointments.map((app) => {
            <div className="border px-8 py-2 cursor-pointer">
              <div className="flex justify-between">
                <div>{app?.doctorName}</div>
                <div>Date: {new Date(app?.start)}</div>
              </div>
              <p>Reason: {app?.reason}</p>
            </div>;
          })}
        </article>
      )}
    </section>
  );
};

export default Profile;
