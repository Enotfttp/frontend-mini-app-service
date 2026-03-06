import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createTask, deleteTask, getAllTasks, getTask, updateTask } from './api';
import { ICreateTaskPayload, IUpdateTaskPayload } from './types';

export const useGetTasks = () =>
  useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
    retry: false,
  });

export const useGetTask = (id: string) =>
  useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
    enabled: !!id,
    retry: false,
  });

export const usePostTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateTaskPayload) => createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IUpdateTaskPayload }) =>
      updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
