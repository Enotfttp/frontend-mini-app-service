import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';

import { TaskStatus, useGetTasks } from '@entities/task';
import { useGetUsers } from '@entities/user';
import { CreateTaskDialog } from '@features/create-task';

import { TaskColumn } from './TaskColumn';
import { BoardContainer } from './TaskBoard.styled';

const STATUS_ORDER: TaskStatus[] = [
  TaskStatus.CREATED,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DECLINED,
  TaskStatus.APPROVED,
];

export const TaskBoard: React.FC = () => {
  const { data, isLoading, isError } = useGetTasks();
  const tasks = Array.isArray(data) ? data : [];
  const { data: usersData } = useGetUsers();
  const users = Array.isArray(usersData) ? usersData : [];
  const [dialogOpen, setDialogOpen] = useState(false);

  // Use first user as creator for demo; replace with auth context in production
  const creatorId = users[0]?.id;

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, typeof tasks> = {
      [TaskStatus.CREATED]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.DECLINED]: [],
      [TaskStatus.APPROVED]: [],
    };
    tasks.forEach((task) => {
      if (map[task.status]) {
        map[task.status].push(task);
      }
    });
    return map;
  }, [tasks]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box px={2} pt={1.5} display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
        {isError && (
          <Typography variant="body2" color="error">
            Не удалось загрузить задачи
          </Typography>
        )}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ textTransform: 'none' }}
        >
          Добавить задачу
        </Button>
      </Box>

      <BoardContainer>
        {STATUS_ORDER.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status]}
            users={users}
          />
        ))}
      </BoardContainer>

      <CreateTaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        creatorId={creatorId}
      />
    </>
  );
};
