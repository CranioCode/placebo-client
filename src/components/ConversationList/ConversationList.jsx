import { Conversation } from "../../components";
import AuthContext from "../../global/auth/auth-context";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../../components";
import "./ConversationList.scss";

const ConversationList = ({ list, handleClick, currentConversationId }) => {
  const [conversation, setConversation] = useState([]);
  const [isConversationsLoaded, setIsConversationsLoaded] = useState(true);

  const { user } = useContext(AuthContext);

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

  const fetchDoctor = async (uid) => {
    const doctors = await fetch(`${import.meta.env.VITE_BACKEND_API}/doctor/${uid}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const doctorData =  (await doctors.json()).message;
    return doctorData;
  };

  useEffect(() => {
    (async () => {
      const conversation = await Promise.all(
        list.map(async (elem) => {
          const otherMember = elem?.members?.find(
            (member) => member !== user?._id
          );
          const { name, profilePic } = user?.role === "doctor"
            ? await fetchPatient(otherMember)
            : await fetchDoctor(otherMember);
          return { ...elem, name, profilePic };
        })
      );
      setConversation(conversation);
    })();
  }, [list, user]);

  return (
    <div
      id="conversationList"
      className="relative w-[24rem] bg-back border-tertiary overflow-y-scroll overflow-x-hidden divide-y-[0.001rem] divide-solid divide-dark divide-opacity-[0.4]">
      {!isConversationsLoaded && <Loader />}
      {isConversationsLoaded &&
        conversation.map((elem) => (
          <div
            onClick={() => {
              handleClick(elem._id);
            }}
            key={elem._id}>
            <Conversation
              isCurrentConversation={
                elem._id === currentConversationId ? true : false
              }
              name={elem.name}
              profilePic={elem.profilePic}
            />
          </div>
        ))}
    </div>
  );
};

export default ConversationList;
