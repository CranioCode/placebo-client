import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUser } from "../../global/auth-helper";

import { Button } from "../../components";

const Profile = () => {
  const [user, setUser] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  //? Fetch doctor here
  useEffect(() => {
    (async () => {
      const data = await getUser(id);
      if (data.success) {
        setUser(data.message);
      }
    })();
  }, [id]);

  const handleBookAppointment = () => {
    if (user?.role === "user") {
      navigate({ pathname: "/appointment" });
    }
  };

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
                <address>{user?.address?.city}</address>
                <address>{user?.address?.state}</address>
                <address>{user?.address?.pincode}</address>
              </div>
            </div>
          </div>
        </div>
      </article>
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
            <div className="flex-[50%] mb-4">
              <div className="inline-block mr-2">RATINGS :</div>
              <span className="text-tertiary font-bold">
                {user?.rating?.value}
              </span>
            </div>
            <div className="flex-[50%] mb-4">
              <div className="inline-block mr-2">REG NO. :</div>
              <span className="text-tertiary font-bold">
                {user?.registrationNumber}
              </span>
            </div>
            <div className="flex-[50%] mb-4">
              <div className="inline-block mr-2">CHARGE/HOUR :</div>
              <span className="text-tertiary font-bold">{user?.charge}</span>
            </div>
            <div className="flex-[50%] mb-4">
              <Button
                text="Book Appointment"
                outline
                func={handleBookAppointment}
              />
            </div>
          </div>
          <div className="text-xl mb-6">
            <p>{user?.description}</p>
          </div>
        </div>
        <div className="accordion">Accordion Here</div>
      </article>
    </section>
  );
};

export default Profile;
