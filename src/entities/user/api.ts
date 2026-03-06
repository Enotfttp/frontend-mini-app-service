import { axiosInstance } from '@shared/api';

import { ICreateUserPayload, IUpdateUserPayload, IUser } from './types';

export const getUsers = (): Promise<IUser[]> =>
  axiosInstance({ url: '/users', method: 'GET' });

export const getUser = (id: string): Promise<IUser> =>
  axiosInstance({ url: `/users/${id}`, method: 'GET' });

export const createUser = (payload: ICreateUserPayload): Promise<IUser> =>
  axiosInstance({ url: '/users', method: 'POST', data: payload });

// PUT /users — id передаётся в теле запроса (как в UserController)
export const updateUser = (payload: IUpdateUserPayload): Promise<IUser> =>
  axiosInstance({ url: '/users', method: 'PUT', data: payload });

export const deleteUser = (id: string): Promise<void> =>
  axiosInstance({ url: `/users/${id}`, method: 'DELETE' });
