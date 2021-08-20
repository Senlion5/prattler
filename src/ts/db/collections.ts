import firebase from "firebase/app";
import "firebase/firestore";
import { UserData } from "../interfaces/auth";
import { ReceivedChatData } from "../interfaces/chats";
import db from "./firestore";

export const profilesCollection = db.collection(
  "profiles"
) as firebase.firestore.CollectionReference<UserData>;

export const chatsCollection = db.collection(
  "chats"
) as firebase.firestore.CollectionReference<ReceivedChatData>;
