import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "../../components/ChatList/ChatList";
import AvailableChats from "../../components/AvailableChats/AvailableChats";
import withNavWrapper from "../../wrappers/withNavWrapper";
import Notification from "../../utils/notifications";
import ChatSearch from "../../components/ChatSearch/ChatSearch";
import ChatsHeader from "../../components/ChatsHeader/ChatsHeader";
import { fetchChats } from "../../store/actions/chats";
import { CreateButton } from "./HomeStyles";
import { cn } from "@bem-react/classname";
import "./HomeScreen.scss";

import { MappedChatData } from "../../interfaces/chats";
import { UserData } from "src/ts/interfaces/auth";

const b = cn("MainRow");

const Home: FC<{ user: UserData }> = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const chats = useSelector(({ chats }) => chats);
  const [homeFilteredChats, setHomeFilteresChats] = useState<MappedChatData[]>(
    []
  );

  const getHomeFilteredChats = (filteredChats: MappedChatData[]) => {
    setHomeFilteresChats(filteredChats);
  };

  useEffect(() => {
    if (homeFilteredChats === undefined || homeFilteredChats.length === 0) {
      setHomeFilteresChats(chats.joined);
    }
  }, [chats.joined]);

  useEffect(() => {
    Notification.setup();
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className={b("")}>
      <div className={b("ListColumn")}>
        <ChatSearch
          chats={chats.joined}
          sendFilteredChats={getHomeFilteredChats}
        />
        <ChatList filteredChats={homeFilteredChats} />
      </div>
      <div className={b("AvailableChatsColumn")}>
        <ChatsHeader>
          <CreateButton
            onClick={() => {
              history.push("/newChat");
            }}
          >
            Create
          </CreateButton>
        </ChatsHeader>
        <AvailableChats user={user} chats={chats.available}></AvailableChats>
      </div>
    </div>
  );
};

export default withNavWrapper(Home, { canReturn: false });
