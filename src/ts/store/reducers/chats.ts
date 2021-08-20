import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  ChatsActionTypes,
  MessagesDictionary,
  SubscriptionDictionary,
} from "../types/chats";
import { ActiveChatDictionary, MappedChatData } from "../../interfaces/chats";

const ChatReducer = () => {
  const joined = (state: MappedChatData[] = [], action: ChatsActionTypes) => {
    switch (action.type) {
      case "CHATS_ERASE":
        return [];
      case "CHATS_FETCH_SUCCESS":
        return action.joined;
      case "CHATS_JOIN_SUCCESS":
        return [...state, action.chat];
      default: {
        return state;
      }
    }
  };

  const available = (
    state: MappedChatData[] = [],
    action: ChatsActionTypes
  ) => {
    switch (action.type) {
      case "CHATS_ERASE":
        return [];
      case "CHATS_FETCH_SUCCESS":
        return action.available;
      case "CHATS_JOIN_SUCCESS":
        return state.filter((chat) => chat.id !== action.chat.id);
      default: {
        return state;
      }
    }
  };

  // Created with @reduxjs/toolkit
  const activeChats = createReducer({} as ActiveChatDictionary, {
    CHAT_SET_ACTIVE_CHAT: (state, action) => {
      const { chat } = action;
      state[chat.id] = chat;
    },
    CHATS_UPDATE_USER_STATE: (state, action) => {
      const { user, chatId } = action;
      const chat = state[chatId];
      const joinedUsers = chat.joinedUsers;
      const index = joinedUsers.findIndex(
        (joinedUser) => joinedUser.uid === user.uid
      );

      if (index < 0) {
        return state;
      }
      if (joinedUsers[index].state === user.state) {
        return state;
      }

      joinedUsers[index].state = user.state;
    },
  });

  const messages = createReducer({} as MessagesDictionary, {
    CHATS_SET_MESSAGES: (state, action) => {
      const previousMessages = state[action.chatId] || [];
      state[action.chatId] = [
        ...previousMessages,
        ...action.messagesWithAuthor,
      ];
    },
  });

  const messagesSubscriptions = (
    state: SubscriptionDictionary = {},
    action: ChatsActionTypes
  ) => {
    switch (action.type) {
      case "CHATS_REGISTER_MESSAGE_SUB":
        return { ...state, [action.chatId]: action.subscription };
      default:
        return state;
    }
  };

  return combineReducers({
    joined,
    available,
    activeChats,
    messages,
    messagesSubscriptions,
  });
};

export default ChatReducer();
