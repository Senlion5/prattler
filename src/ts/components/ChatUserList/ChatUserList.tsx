import React, { FC } from "react";
import FlatList from "flatlist-react";
import { cn } from "@bem-react/classname";
import "./ChatUserList.scss";

import { UserData } from "../../interfaces/auth";
import { ActiveChatUserData } from "../../interfaces/chats";

interface ChatUserListProps {
  users: ActiveChatUserData[];
}

const b = cn("UserListContainer");

const ChatUserList: FC<ChatUserListProps> = ({ users }) => {
  const renderUserListItem = (user: ActiveChatUserData) => {
    return (
      <li onClick={() => {}} className={b("Items_Item")}>
        <div className={b("Items_Item_IconBlock")}>
          {user.avatar ? (
            <img
              className={b("Items_Item_IconBlock_Status_Img")}
              src={user.avatar}
              alt="User_Icon"
            />
          ) : (
            <img
              className={b("Items_Item_IconBlock_Status_Img")}
              src="assets/images/blank_profile.jpg"
              alt="User_Icon"
            />
          )}
          <span
            className={b("Items_Item_IconBlock_Status_Sign", [`${user.state}`])}
          ></span>
        </div>
        <div className={b("Items_ChatUserName")}>
          <div>{user.username}</div>
        </div>
      </li>
    );
  };

  return (
    <div className={b("")}>
      <ul className={b("Items")}>
        <FlatList
          list={users}
          renderItem={(user: UserData, idx: number) => (
            <div key={idx}>{renderUserListItem(user)}</div>
          )}
          renderWhenEmpty={() => (
            <div className={b("Items_NoUsers")}>No users</div>
          )}
        />
      </ul>
    </div>
  );
};

export default ChatUserList;
