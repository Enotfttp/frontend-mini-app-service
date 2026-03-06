import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createCalendarEvent,
  deleteCalendarEvent,
  getCalendarEvent,
  getCalendarEvents,
  updateCalendarEvent,
} from './api';
import { ICreateCalendarPayload, IUpdateCalendarPayload } from './types';

export const useGetCalendarEvents = () =>
  useQuery({
    queryKey: ['calendar-events'],
    queryFn: getCalendarEvents,
    retry: false,
  });

export const useGetCalendarEvent = (id: string) =>
  useQuery({
    queryKey: ['calendar-event', id],
    queryFn: () => getCalendarEvent(id),
    enabled: !!id,
    retry: false,
  });

export const usePostCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateCalendarPayload) => createCalendarEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    },
  });
};

export const usePutCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateCalendarPayload) => updateCalendarEvent(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      queryClient.invalidateQueries({ queryKey: ['calendar-event', variables.id] });
    },
  });
};

export const useDeleteCalendarEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCalendarEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    },
  });
};
