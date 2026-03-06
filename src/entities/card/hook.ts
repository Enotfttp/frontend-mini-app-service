import { getCard, updateCard } from './api';
import { IUpdateCardPayload } from './types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetCard = (id: string) =>
  useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
    enabled: !!id,
    retry: false,
  });

export const usePutCard = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateCardPayload) => updateCard(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['card', id] });
    },
  });
};
