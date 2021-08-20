import React, { FC, useEffect, useState, useMemo } from "react";
import { cn } from "@bem-react/classname";
import { StyledOutlinedInput } from "../ComponentsStyles";
import "./ChatSearch.scss";

import { MappedChatData } from "../../interfaces/chats";

interface ChatSearchProps {
  chats: MappedChatData[];
  sendFilteredChats: (value: MappedChatData[]) => void;
}

const b = cn("ChatSearchBox");

const ChatSearch: FC<ChatSearchProps> = ({ chats, sendFilteredChats }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const onChangeSearchValue: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const filteredChats = useMemo(() => {
    const terms = searchValue.toUpperCase().split(/\s+/);

    return chats
      .filter((item) =>
        terms.every((term) =>
          [item.title].some((value) =>
            value.toUpperCase().replace(/\s+/g, "").includes(term)
          )
        )
      )
      .map((item) => {
        const structuredChatData = {
          title: item.title,
          id: item.id,
          image: item.image,
          description: item.description,
          joinedUsers: item.joinedUsers,
          admin: item.admin,
        };

        return structuredChatData;
      });
  }, [chats, searchValue]);

  useEffect(() => {
    sendFilteredChats(filteredChats);
  }, [filteredChats]);

  return (
    <div className={b("")}>
      <StyledOutlinedInput
        type="text"
        name="search"
        placeholder="Search for Chat"
        value={searchValue}
        onChange={onChangeSearchValue}
      />
    </div>
  );
};

export default ChatSearch;
