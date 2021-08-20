import db from "../db/firestore";
import firebase from "firebase/app";
import { ReceivedChatData } from "../interfaces/chats";
import { DocumentChange, DocumentReference } from "@firebase/firestore-types";
import { ReceivedMessageData } from "./../interfaces/chats";
import { CreateChatData } from "../interfaces/chats";
import { MessageData } from "../interfaces/chats";
import { UserData } from "../interfaces/auth";

import { profilesCollection, chatsCollection } from "../db/collections";

export const fetchChats = async (): Promise<ReceivedChatData[]> => {
  return await chatsCollection.get().then((snapshot) => {
    const chats = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return chats;
  });
};

export const newChat = (chat: CreateChatData) =>
  db
    .collection("chats")
    .add(chat)
    .then((docRef: DocumentReference) => docRef.id);

export const joinChat = async (userId: string, chatId: string) => {
  const userRef = db.doc(`profiles/${userId}`);
  const chatRef = db.doc(`chats/${chatId}`);

  await userRef.update({
    joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef),
  });
  await chatRef.update({
    joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef),
  });
};

export const subscribeToChat = (
  chatId: string,
  onSubscribe: (chat: ReceivedChatData) => void
) =>
  chatsCollection.doc(chatId).onSnapshot((snapshot) => {
    const chat = { id: snapshot.id, ...snapshot.data() } as ReceivedChatData;
    onSubscribe(chat);
  });

export const subscribeToProfile = (
  userId: string,
  onSubscribe: (user: UserData) => void
) =>
  profilesCollection.doc(userId).onSnapshot((snapshot) => {
    onSubscribe(snapshot.data() as UserData);
  });

export const sendMessage = (message: MessageData, chatId: string) =>
  chatsCollection
    .doc(chatId)
    .collection("messages")
    .doc(message.timestamp)
    .set(message);

export const subscribeToMessages = (
  chatId: string,
  onSubscribe: (changes: DocumentChange<ReceivedMessageData>[]) => void
): (() => void) =>
  chatsCollection
    .doc(chatId)
    .collection("messages")
    .onSnapshot((snapshot) =>
      onSubscribe(
        snapshot.docChanges() as DocumentChange<ReceivedMessageData>[]
      )
    );
