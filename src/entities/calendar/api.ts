import { axiosInstance } from '@shared/api';

import { ICalendar, ICreateCalendarPayload, IUpdateCalendarPayload } from './types';

export const getCalendarEvents = (): Promise<ICalendar[]> =>
  axiosInstance({ url: '/calendar-events', method: 'GET' });

export const getCalendarEvent = (id: string): Promise<ICalendar> =>
  axiosInstance({ url: `/calendar-events/${id}`, method: 'GET' });

export const createCalendarEvent = (payload: ICreateCalendarPayload): Promise<ICalendar> =>
  axiosInstance({ url: '/calendar-events', method: 'POST', data: payload });

export const updateCalendarEvent = (payload: IUpdateCalendarPayload): Promise<ICalendar> =>
  axiosInstance({ url: '/calendar-events', method: 'PUT', data: payload });

export const deleteCalendarEvent = (id: string): Promise<void> =>
  axiosInstance({ url: `/calendar-events/${id}`, method: 'DELETE' });
