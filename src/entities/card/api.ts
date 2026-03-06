import { axiosInstance } from '@shared/api';

import { ICardDetail, IUpdateCardPayload } from './types';

export const getCard = (id: string): Promise<ICardDetail> =>
  axiosInstance({ url: `/cards/${id}`, method: 'GET' });

export const updateCard = (id: string, payload: IUpdateCardPayload): Promise<ICardDetail> =>
  axiosInstance({ url: `/cards/${id}`, method: 'PUT', data: payload });
