import { useRef, useEffect } from "react";
import { format } from "timeago.js";
import "./MessageList.scss";

const MessageList = ({ messages, UserUid }) => {

  const scrollView = useRef();

  const sendMessageStyles = {
    marginX: "ml-auto mr-8",
    border: "border-solid border-2 border-tertiary",
    color: "text-dark",
  };

  const recieveMessageStyles = {
    marginX: "mr-auto ml-8",
    bgColor: "bg-tertiary",
    border: "border-solid border-2 border-tertiary",
    color: "text-back",
  };

  useEffect(() => {
    scrollView?.current?.scrollIntoView();
  },[messages])

  return (
    <div
      id="messageList"
      className="mt-auto overflow-y-scroll overflow-x-hidden py-4">
      {messages &&
        messages.map((elem) => (
          <div className="flex" key={elem._id} ref={scrollView}>
            <div
              className={`max-w-xl mt-2 rounded-md flex flex-wrap justify-end 
                ${
                  elem.sender === UserUid
                    ? Object.values(sendMessageStyles).join(" ")
                    : Object.values(recieveMessageStyles).join(" ")
                }
              `}>
              <div className="text-lg p-1">{elem.body}</div>
              <div className="ml-auto mt-auto pl-4 pr-1 text-[0.6rem] italic">
                {format(new Date(elem.createdAt))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessageList;
