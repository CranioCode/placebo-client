import "./Conversation.scss";

const Message = ({ name, profilePic, isCurrentConversation }) => {
  return (
    <div
      className={`flex px-2 transition-colors  ${
        isCurrentConversation ? "bg-senary" : "hover:bg-quinary"
      } `}>
      <div
        className="w-16 h-16 shrink-0 bg-cover rounded-full mx-2 my-2.5"
        style={{
          backgroundImage:
          `url(${encodeURI(profilePic ?? '/src/img/assets/defaultProfile.png')})` ,
        }}></div>
      <div className="grow  flex content-center items-center p-2 text-xl font-bold whitespace-nowrap overflow-hidden">
        {name}
      </div>
    </div>
  );
};

export default Message;
