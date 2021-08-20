import React, { FC } from "react";
import FlatList from "flatlist-react";
import { useHistory } from "react-router-dom";
import { cn } from "@bem-react/classname";
import "./ChatList.scss";

import { MappedChatData } from "../../interfaces/chats";

interface ChatListProps {
  filteredChats: MappedChatData[];
}

const b = cn("ListContainer");

const ChatList: FC<ChatListProps> = ({ filteredChats }) => {
  const history = useHistory();

  const renderChatListItem = (chat: MappedChatData) => {
    return (
      <li
        onClick={() => history.push(`/chat/${chat.id}`)}
        className={b("Items_Item")}
      >
        <div className={b("Items_Item_IconBlock")}>
          {chat.image ? (
            <img
              className={b("Items_Item_IconBlock_Status_Img")}
              src={chat.image}
              alt="Chat_Icon"
            />
          ) : (
            <img
              className={b("Items_Item_IconBlock_Status_Img")}
              src="assets/images/chat_icon.png"
              alt="Chat_Icon"
            />
          )}
          <span
            className={b("Items_Item_IconBlock_Status_Sign", ["Online"])}
          ></span>
        </div>
        <div className={b("Items_ChatName")}>
          <div>{chat.title}</div>
        </div>
      </li>
    );
  };

  return (
    <div className={b("")}>
      <ul className={b("Items")}>
        <FlatList
          list={filteredChats}
          renderItem={(chat: MappedChatData, idx: number) => (
            <div key={idx}>{renderChatListItem(chat)}</div>
          )}
          renderWhenEmpty={() => (
            <div className={b("Items_Empty")}>No chats</div>
          )}
        />
      </ul>
    </div>
  );
};

export default ChatList;
