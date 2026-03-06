export interface IUser {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface ICreateUserPayload {
  name: string;
}

export interface IUpdateUserPayload {
  id: string;
  name: string;
}
