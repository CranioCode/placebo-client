import { Button, ConversationList, Input, MessageList } from "../../components";
import "./Chat.scss";
import AuthContext from "../../global/auth/auth-context";
import { useContext, useEffect, useState } from "react";
import { useSocket } from "../../global/SocketContext";

const Chat = () => {
  const [isConversationsLoaded, setIsConversationLoaded] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);

  const { user } = useContext(AuthContext);

  const socket = useSocket();

  useEffect(() => {
    user?._id &&
      (async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/conversation/${user._id}`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const responseObj = await response.json();

        if (responseObj.success) {
          setConversations(responseObj.data);
          setIsConversationLoaded(true);
        }
      })();
  }, [user]);

  useEffect(() => {
    socket.current &&
      socket?.current?.off("receiveMessage").on("receiveMessage", (message) => {
        message &&
          setCurrentMessages((prevCurrentMessages) => {
            return [...prevCurrentMessages, message];
          });
      });
  }, [socket.current]);

  const handleClick = async (conversationId) => {
    if (currentConversationId === conversationId) return;
    setCurrentConversationId(conversationId);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/message/${conversationId}`,{
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const responseObj = await response.json();
    if (responseObj.success) {
      setCurrentMessages(responseObj.data);
    } else {
      setCurrentMessages([]);
    }
  };

  const handleMessageSend = async () => {
    if (!currentConversationId) return;

    const { _id, members } = conversations.find(
      (elem) => elem?._id === currentConversationId
    );

    const message = {
      conversationId: _id,
      body: newMessage,
      sender: user?._id,
      receiver: members?.find((elem) => elem !== user?._id),
    };

    socket.current.emit("sendMessage", message);
    
    setCurrentMessages((prevCurrentMessages) => {
      return [...prevCurrentMessages, message];
    });
    
    await fetch(`${import.meta.env.VITE_BACKEND_API}/message/`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });
    setNewMessage("");
  };

  return (
    <section id="chat" className="flex min-w-[100%] h-full abosolute">
      <ConversationList
        currentConversationId={currentConversationId}
        isConversationsLoaded={isConversationsLoaded}
        handleClick={handleClick}
        list={conversations}
      />
      <div className="grow flex flex-col bg-white overflow-hidden">
        <MessageList messages={currentMessages} UserUid={user?._id} />

        <div className="flex items-center py-4 px-2 border-t-[0.1rem] border-t-primary">
          <Input
            type="textarea"
            placeholder="type a message"
            resize={false}
            containerClasses={["mx-4"]}
            value={newMessage}
            setValue={setNewMessage}
            minHeight="40"
            maxHeight="124"
          />
          <Button
            text="SEND"
            outline={true}
            classList={["mr-4 h-10"]}
            func={handleMessageSend}
          />
        </div>
      </div>
    </section>
  );
};

export default Chat;
