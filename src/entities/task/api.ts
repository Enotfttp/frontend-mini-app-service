import { axiosInstance } from '@shared/api';

import { ICreateTaskPayload, ITask, IUpdateTaskPayload } from './types';

export const getAllTasks = (): Promise<ITask[]> =>
  axiosInstance({ url: '/tasks', method: 'GET' });

export const getTask = (id: string): Promise<ITask> =>
  axiosInstance({ url: `/tasks/${id}`, method: 'GET' });

export const createTask = (payload: ICreateTaskPayload): Promise<ITask> =>
  axiosInstance({ url: '/tasks', method: 'POST', data: payload });

export const updateTask = (id: string, payload: IUpdateTaskPayload): Promise<ITask> =>
  axiosInstance({ url: `/tasks/${id}`, method: 'PUT', data: payload });

export const deleteTask = (id: string): Promise<void> =>
  axiosInstance({ url: `/tasks/${id}`, method: 'DELETE' });
