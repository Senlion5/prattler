import React, { FC, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  subscribeToChat,
  subscribeToProfile,
  sendMessage,
  subscribeToMessages,
  registerMessageSubscription,
} from "../../store/actions/chats";
import ChatUserList from "../../components/ChatUserList/ChatUserList";
import ChatMessagesList from "../../components/ChatMessagesList/ChatMessagesList";
import MessageField from "../../components/MessageField/MessageField";
import withNavWrapper from "../../wrappers/withNavWrapper";
import { cn } from "@bem-react/classname";
import "./ChatScreen.scss";

import { UserData } from "../../interfaces/auth";
import { MessageData } from "../../interfaces/chats";

const b = cn("MainRow");

const Chat: FC<{ user: UserData }> = ({ user }) => {
  const dispatch = useDispatch();
  const chats = useSelector(({ chats }) => chats.joined);
  const { id } = useParams() as { id: string };

  const usersWatcher = useRef({});
  const messageListEnd = useRef<any>();

  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const messages = useSelector(({ chats }) => chats.messages[id]);
  const messagesSubscription = useSelector(
    ({ chats }) => chats.messagesSubscriptions[id]
  );

  const joinedUsers = activeChat?.joinedUsers;

  const selectedChat = chats.find((chat) => chat.id === id);

  const unsubscribeFromJoinedUsers = useCallback(() => {
    Object.keys(usersWatcher.current).forEach((id) =>
      usersWatcher.current[id]()
    );
  }, [usersWatcher.current]);

  useEffect(() => {
    const unsubscribeFromChat = subscribeToChat(id)(dispatch);

    if (!messagesSubscription) {
      const unsubscribeFromMessages = subscribeToMessages(id)(dispatch);
      dispatch(registerMessageSubscription(id, unsubscribeFromMessages));
    }

    return () => {
      unsubscribeFromChat();
      unsubscribeFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  const subscribeToJoinedUsers = useCallback(
    (joinedUsers) => {
      joinedUsers.forEach((user: UserData) => {
        if (!usersWatcher.current[user.uid]) {
          usersWatcher.current[user.uid] = subscribeToProfile(
            user.uid,
            id
          )(dispatch);
        }
      });
    },
    [dispatch, id]
  );

  const sendChatMessage = useCallback(
    (message: MessageData) => {
      sendMessage(
        message,
        id,
        user.uid
      )(dispatch).then((_: any) => {
        if (messageListEnd.current)
          messageListEnd.current.scrollIntoView(false);
      });
    },
    [id]
  );

  if (!selectedChat) return <div>CHAT NOT FOUND</div>;
  return (
    <div className={b("")}>
      <div className={b("UsersList")}>
        <ChatUserList users={activeChat?.joinedUsers} />
      </div>
      <div className={b("MessagesColumn")}>
        <ChatMessagesList
          innerRef={messageListEnd}
          chat={selectedChat}
          messages={messages || []}
        />
        <MessageField onSubmit={sendChatMessage} />
      </div>
    </div>
  );
};

export default withNavWrapper(Chat, { canReturn: false });
