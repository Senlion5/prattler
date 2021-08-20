import { DocumentReference } from "@firebase/firestore-types";
import { UserData } from "./auth";

// CHATS
export interface CreateChatData {
  title: string;
  description: string;
  image: string;
}

export interface ReceivedChatData {
  id: string;
  title: string;
  description: string;
  image: string;
  joinedUsers: Array<DocumentReference<UserData>>;
  admin: DocumentReference<UserData>;
}

export interface MappedChatData {
  id: string;
  title: string;
  description: string;
  image: string;
  joinedUsers: Array<string>;
  admin: DocumentReference<UserData>;
}

export interface UpdateActionFilteredChats {
  joined: MappedChatData[];
  available: MappedChatData[];
}

export type ActiveChatDictionary = { [chatId: string]: ObjectActiveChatData };

export interface ObjectActiveChatData {
  id: string;
  title: string;
  description: string;
  image: string;
  joinedUsers: ActiveChatUserData[];
  admin: DocumentReference<UserData>;
}

export interface ActiveChatUserData {
  uid: string;
  username: string;
  email: string;
  avatar: string;
  state: string;
  lastChanged: Date;
  joinedChats: DocumentReference<ReceivedChatData>[];
  joinedChatList?: [];
}

// MESSAGES
export interface MessageData {
  content: string;
  timestamp: string;
}

export interface ReceivedMessageData {
  id: string;
  author: DocumentReference<UserData>;
  content: string;
  timestamp: string;
}

export interface EntireMessageData {
  id: string;
  author: UserData;
  content: string;
  timestamp: string;
}
