import * as API from "../../api/chats";
import db from "../../db/firestore";
import { Dispatch } from "redux";
import {
  CreateChatData,
  ReceivedChatData,
  MappedChatData,
  MessageData,
  ObjectActiveChatData,
  ReceivedMessageData,
} from "../../interfaces/chats";
import { UserData } from "../../interfaces/auth";
import {
  ChatsFetchInitAction,
  ChatsFetchAction,
  NewChatAction,
  JoinChatAction,
  SendMessageAction,
  SubscribeToChatAction,
  SubscribeToProfileAction,
  SubscribeToMessagesAction,
  RegisterMessageSubscriptionAction,
} from "../../store/types/chats";
import { ApplicationState } from "../../../../config";
import { DocumentReference } from "@firebase/firestore-types";
import {
  EntireMessageData,
  UpdateActionFilteredChats,
} from "../../interfaces/chats";

export const fetchChats =
  () =>
  async (
    dispatch: Dispatch<ChatsFetchInitAction | ChatsFetchAction>,
    getState: () => ApplicationState
  ): Promise<UpdateActionFilteredChats> => {
    const { user } = getState().auth.user;
    if (!user) {
      return Promise.reject("No user when fetching chats");
    }
    dispatch({ type: "CHATS_FETCH_INIT" });

    const fetchedChats: ReceivedChatData[] = await API.fetchChats();
    const chats: MappedChatData[] = fetchedChats.map((chat) => ({
      ...chat,
      joinedUsers: chat.joinedUsers.map((user) => user.id),
    }));

    const filteredChats = chats.reduce(
      (accumulated: UpdateActionFilteredChats, chat) => {
        const picked = chat.joinedUsers.includes(user.uid)
          ? "joined"
          : "available";
        accumulated[picked].push(chat);
        return accumulated;
      },
      { joined: [], available: [] }
    );

    dispatch({
      type: "CHATS_FETCH_SUCCESS",
      ...filteredChats,
    });

    return filteredChats;
  };

export const joinChat =
  (chat: MappedChatData, uid: string) =>
  async (dispatch: Dispatch<JoinChatAction>): Promise<void> => {
    await API.joinChat(uid, chat.id);
    dispatch({ type: "CHATS_JOIN_SUCCESS", chat });
  };

export const newChat =
  (formData: CreateChatData, userId: string) =>
  async (
    dispatch: Dispatch<NewChatAction | JoinChatAction>
  ): Promise<string> => {
    const admin = db.doc(`profiles/${userId}`) as DocumentReference<UserData>;
    const newChat = { ...formData, admin };

    const chatId = await API.newChat(newChat);
    dispatch({ type: "CHATS_NEW_SUCCESS" });
    await API.joinChat(userId, chatId);
    dispatch({
      type: "CHATS_JOIN_SUCCESS",
      chat: {
        ...newChat,
        id: chatId,
        joinedUsers: [] as string[],
      },
    });
    return chatId;
  };

export const subscribeToChat =
  (chatId: string) => (dispatch: Dispatch<SubscribeToChatAction>) =>
    API.subscribeToChat(chatId, async (chat) => {
      const joinedUsers = (await Promise.all(
        chat.joinedUsers.map(async (userRef) => {
          const userSnapshot = await userRef.get();
          return userSnapshot.data();
        })
      )) as UserData[];

      const newChat: ObjectActiveChatData = { ...chat, joinedUsers };

      dispatch({ type: "CHAT_SET_ACTIVE_CHAT", chat: newChat });
    });

export const subscribeToProfile =
  (userId: string, chatId: string) =>
  (dispatch: Dispatch<SubscribeToProfileAction>) =>
    API.subscribeToProfile(userId, (user: UserData) => {
      dispatch({ type: "CHATS_UPDATE_USER_STATE", user, chatId });
    });

export const sendMessage =
  (message: MessageData, chatId: string, uid: string) =>
  async (dispatch: Dispatch<SendMessageAction>): Promise<void> => {
    const newMessage = { ...message, author: db.doc(`profiles/${uid}`) };

    dispatch({ type: "CHATS_MESSAGE_SENT" });

    return await API.sendMessage(newMessage, chatId);
  };

export const subscribeToMessages =
  (chatId: string) => (dispatch: Dispatch<SubscribeToMessagesAction>) => {
    return API.subscribeToMessages(chatId, async (messages) => {
      const chatMessages = messages.map((message) => {
        if (message.type === "added") {
          return { ...message.doc.data(), id: message.doc.id };
        }
      }) as ReceivedMessageData[];

      const messagesWithAuthor: EntireMessageData[] = [];
      const cache = {};

      for await (let message of chatMessages) {
        if (!cache[message.author.id]) {
          const userSnapshot = await message.author.get();
          cache[userSnapshot.id] = userSnapshot.data();
        }
        const messageWithAuthor = {
          ...message,
          author: cache[message.author.id],
        };

        messagesWithAuthor.push(messageWithAuthor);
      }

      dispatch({ type: "CHATS_SET_MESSAGES", messagesWithAuthor, chatId });
      return messagesWithAuthor;
    });
  };

export const registerMessageSubscription = (
  chatId: string,
  messageSubscription: () => void
): RegisterMessageSubscriptionAction => ({
  type: "CHATS_REGISTER_MESSAGE_SUB",
  subscription: messageSubscription,
  chatId,
});
