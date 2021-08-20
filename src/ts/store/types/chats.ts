import { UserData } from "../../interfaces/auth";
import {
  EntireMessageData,
  MappedChatData,
  ActiveChatDictionary,
  ObjectActiveChatData,
} from "../../interfaces/chats";

export interface EraseChatsAction {
  type: "CHATS_ERASE";
}

export interface RegisterMessageSubscriptionAction {
  type: "CHATS_REGISTER_MESSAGE_SUB";
  subscription: () => void;
  chatId: string;
}

export interface SubscribeToMessagesAction {
  type: "CHATS_SET_MESSAGES";
  messagesWithAuthor: EntireMessageData[];
  chatId: string;
}

export interface SendMessageAction {
  type: "CHATS_MESSAGE_SENT";
}

export interface SubscribeToProfileAction {
  type: "CHATS_UPDATE_USER_STATE";
  user: UserData;
  chatId: string;
}

export interface SubscribeToChatAction {
  type: "CHAT_SET_ACTIVE_CHAT";
  chat: ObjectActiveChatData;
}

export interface NewChatAction {
  type: "CHATS_NEW_SUCCESS";
  chat?: MappedChatData;
}

export interface JoinChatAction {
  type: "CHATS_JOIN_SUCCESS";
  chat: MappedChatData;
}

export interface ChatsFetchInitAction {
  type: "CHATS_FETCH_INIT";
}

export interface ChatsFetchAction {
  type: "CHATS_FETCH_SUCCESS";
  joined: MappedChatData[];
  available: MappedChatData[];
}

export type SubscriptionDictionary = {
  [chatId: string]: () => void;
};

export type MessagesDictionary = {
  [chatId: string]: EntireMessageData[];
};

export type ChatsActionTypes =
  | ChatsFetchInitAction
  | ChatsFetchAction
  | EraseChatsAction
  | RegisterMessageSubscriptionAction
  | SubscribeToMessagesAction
  | SendMessageAction
  | SubscribeToProfileAction
  | SubscribeToChatAction
  | JoinChatAction
  | NewChatAction;

export interface ChatsState {
  available: MappedChatData[];
  joined: MappedChatData[];
  activeChats: ActiveChatDictionary;
  messages: MessagesDictionary;
  messagesSubscriptions: SubscriptionDictionary;
}
