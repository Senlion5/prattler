import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FlatList from "flatlist-react";
import { formatTime } from "../../utils/timestamp";
import { BackButton } from "../../screens/HomeScreen/HomeStyles";
import { cn } from "@bem-react/classname";
import "./ChatMessagesList.scss";

import { EntireMessageData, MappedChatData } from "../../interfaces/chats";

interface ChatMessagesListProps {
  chat: MappedChatData;
  messages: EntireMessageData[];
  innerRef: React.MutableRefObject<any>;
}

const b = cn("MessagesList");

const ChatMessagesList: FC<ChatMessagesListProps> = ({
  chat,
  messages = [],
  innerRef,
}) => {
  const user = useSelector(({ auth }) => auth.user.user);

  const isAuthor = (message: EntireMessageData) => {
    return message?.author.uid === user?.uid ? "ChatRight" : "ChatLeft";
  };

  const renderUserMessageItem = (message: EntireMessageData) => {
    return (
      <div className={b(`${isAuthor(message)}`)}>
        <div className={b(`${isAuthor(message)}_MessageCard`)}>
          <div className={b(`${isAuthor(message)}_MessageCard_UserBlock`)}>
            {message?.author.avatar ? (
              <img
                className={b(`${isAuthor(message)}_MessageCard_UserBlock_Img`)}
                src={message?.author.avatar}
                alt="User_Icon"
              />
            ) : (
              <img
                className={b(`${isAuthor(message)}_MessageCard_UserBlock_Img`)}
                src="assets/images/blank_profile.jpg"
                alt="User_Icon"
              />
            )}
            <div
              className={b(`${isAuthor(message)}_MessageCard_UserBlock_Name`)}
            >
              {message?.author.username}
            </div>
          </div>
          <div className={b(`${isAuthor(message)}_MessageCard_MessageBlock`)}>
            <div
              className={b(
                `${isAuthor(message)}_MessageCard_MessageBlock_Text`
              )}
            >
              {message.content}
            </div>
            <div
              className={b(
                `${isAuthor(message)}_MessageCard_MessageBlock_Time`
              )}
            >
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={b("")}>
      <div className={b("ChatNameContainer")}>
        <div
          className={b("ChatNameContainer_Name")}
        >{`${chat.title} Chat`}</div>
        <Link to="/" className={b("ChatNameContainer_BackButton")}>
          <BackButton>Return</BackButton>
        </Link>
      </div>

      <div className={b("ChatContainerScroll")}>
        <div ref={innerRef}>
          <FlatList
            list={messages}
            renderItem={(message: EntireMessageData, idx: number) => (
              <div key={idx}>{renderUserMessageItem(message)}</div>
            )}
            renderWhenEmpty={() => (
              <div className={b("NoMessages")}>
                There are no messages in this chat
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatMessagesList;
