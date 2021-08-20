import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { joinChat } from "../../store/actions/chats";
import FlatList from "flatlist-react";
import { JoinChatButton } from "../../screens/HomeScreen/HomeStyles";

import { MappedChatData } from "../../interfaces/chats";

import { cn } from "@bem-react/classname";
import "./AvailableChats.scss";
import { UserData } from "src/ts/interfaces/auth";

interface AvailableChatsProps {
  user: UserData;
  chats: MappedChatData[];
}

const b = cn("AvailableChats");

const AvailableChats: FC<AvailableChatsProps> = ({ user, chats }) => {
  const dispatch = useDispatch();

  const confirmJoinChat = (chat: MappedChatData) => {
    dispatch(joinChat(chat, user.uid));
  };

  const renderChatItem = (chat: MappedChatData) => {
    return (
      <div className={b("ChatsGrid_Card")}>
        <div className={b("ChatsGrid_Card_Body")}>
          <div className={b("ChatsGrid_Card_Title")}>{chat.title}</div>
          <div className={b("ChatsGrid_Card_Description")}>
            {chat.description}
          </div>
          <JoinChatButton onClick={() => confirmJoinChat(chat)}>
            Join Chat
          </JoinChatButton>
        </div>
      </div>
    );
  };

  return (
    <div className={b("")}>
      <div className={b("ChatsGrid")}>
        <FlatList
          list={chats}
          renderItem={(chat: MappedChatData, idx: number) => (
            <div key={idx}>{renderChatItem(chat)}</div>
          )}
          renderWhenEmpty={() => (
            <div className={b("ChatsGrid_NoChats")}>
              There are no chats to join
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default AvailableChats;
