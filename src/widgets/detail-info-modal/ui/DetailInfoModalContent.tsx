import type { IUpdateTaskPayload } from '@entities/task';
import { useGetTask, usePostTaskComment, useUpdateTask } from '@entities/task';
import { useGetUsers } from '@entities/user';
import { StyleBox } from './DetailInfoModal.styled';
import { TaskCommentsSection } from './TaskCommentsSection';
import { TaskEditFields } from './TaskEditFields';
import { Alert, Divider, Stack } from '@mui/material';
import { useMemo, useState } from 'react';

export interface DetailInfoModalContentProps {
  params: Record<string, string>;
}

export const DetailInfoModalContent = ({ params }: DetailInfoModalContentProps) => {
  const { id } = params;
  if (!id) throw new Error('id is required');

  const { data: task, isLoading, isError, dataUpdatedAt } = useGetTask(id);
  const { data: usersData } = useGetUsers();
  const users = Array.isArray(usersData) ? usersData : [];
  const { mutateAsync: saveTask } = useUpdateTask();
  const { mutateAsync: sendComment, isPending: sendingComment } = usePostTaskComment();

  const [commentText, setCommentText] = useState('');

  const userNameById = useMemo(() => {
    const m = new Map<string, string>();
    users.forEach((u) => m.set(u.id, u.name));
    return m;
  }, [users]);

  if (isLoading) {
    return (
      <StyleBox>
        <Alert severity="info" variant="outlined">
          Загружаю данные задачи...
        </Alert>
      </StyleBox>
    );
  }

  if (isError || !task) {
    return (
      <StyleBox>
        <Alert severity="error" variant="outlined">
          Не удалось загрузить задачу.
        </Alert>
      </StyleBox>
    );
  }

  const savePatch = async (payload: IUpdateTaskPayload): Promise<void> => {
    await saveTask({ id: task.id, payload });
  };

  const assigneeLabel = (userId: string) => {
    if (!userId) return 'Не назначен';
    return userNameById.get(userId) ?? userId;
  };

  const currentUserId = users[0]?.id ?? '';
  const currentUserName = currentUserId ? userNameById.get(currentUserId) ?? 'Пользователь' : 'Пользователь';

  const submitComment = async () => {
    const text = commentText.trim();
    if (!text || !currentUserId) return;
    await sendComment({ taskId: task.id, payload: { userId: currentUserId, text } });
    setCommentText('');
  };

  return (
    <StyleBox>
      <Stack spacing={2.5} divider={<Divider flexItem />}>
        <TaskEditFields
          task={task}
          users={users}
          dataUpdatedAt={dataUpdatedAt}
          onSavePatch={savePatch}
          assigneeLabel={assigneeLabel}
        />
        <TaskCommentsSection
          comments={task.comments ?? []}
          currentUserName={currentUserName}
          commentText={commentText}
          setCommentText={setCommentText}
          sendingComment={sendingComment}
          canSubmitComment={Boolean(currentUserId)}
          onSubmitComment={submitComment}
        />
      </Stack>
    </StyleBox>
  );
};
