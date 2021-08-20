import db from "../db/firestore";
import firebase from "firebase/app";
import "firebase/auth";
import { CreateUserData, UserData } from "./../interfaces/auth";
import { profilesCollection } from "../db/collections";

const createUserProfile = (userProfile: CreateUserData) =>
  db.collection("profiles").doc(userProfile.uid).set(userProfile);

export const getUserProfile = (uid: string): Promise<UserData | undefined> =>
  profilesCollection
    .doc(uid)
    .get()
    .then((snapshot) => snapshot.data());

export const register = async ({
  email,
  password,
  username,
  avatar,
}): Promise<UserData> => {
  if (avatar === undefined) avatar = "";

  const { user } = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);

  if (user) {
    const userProfile = {
      uid: user.uid,
      username,
      email,
      avatar,
    };

    await createUserProfile(userProfile);
    const receiverUserProfile = await getUserProfile(userProfile.uid);
    if (receiverUserProfile) {
      return receiverUserProfile;
    } else {
      return Promise.reject("No received user profile");
    }
  } else {
    return Promise.reject("No user");
  }
};

export const login = async ({ email, password }) => {
  const { user } = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  if (user) {
    const userProfile = (await getUserProfile(user.uid)) as UserData;
    return userProfile;
  }
};

export const logout = (): Promise<void> => firebase.auth().signOut();

export const onAuthStateChanges = (
  onAuth: (authUser: firebase.User | null) => void
): (() => void) => firebase.auth().onAuthStateChanged(onAuth);
