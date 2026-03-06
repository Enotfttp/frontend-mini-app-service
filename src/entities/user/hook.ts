import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createUser, deleteUser, getUser, getUsers, updateUser } from './api';
import { ICreateUserPayload, IUpdateUserPayload } from './types';

export const useGetUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

export const useGetUser = (id: string) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
    retry: false,
  });

export const usePostUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateUserPayload) => createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const usePutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateUserPayload) => updateUser(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
