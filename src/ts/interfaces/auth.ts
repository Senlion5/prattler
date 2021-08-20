export interface RegisterReq {
  email: string;
  username: string;
  password: string;
  avatar: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface UserData {
  uid: string;
  username: string;
  email: string;
  avatar: string;
  state: string;
  lastChanged: Date;
  joinedChats: [];
}

export interface CreateUserData {
  uid: string;
  username: string;
  email: string;
  avatar: string;
}
