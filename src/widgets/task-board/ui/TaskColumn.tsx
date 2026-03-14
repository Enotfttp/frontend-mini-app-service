import { useDroppable } from '@dnd-kit/core';
import { Chip, Typography } from '@mui/material';
import React from 'react';

import { ITask, TaskStatus } from '@entities/task';
import { IUser } from '@entities/user';

import { TaskCard } from './TaskCard';
import { ColumnCardsList, ColumnHeader, ColumnPaper } from './TaskBoard.styled';

// ─── display config ──────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; color: 'default' | 'info' | 'error' | 'success' }
> = {
  [TaskStatus.CREATED]: { label: 'Создано', color: 'default' },
  [TaskStatus.IN_PROGRESS]: { label: 'В работе', color: 'info' },
  [TaskStatus.DECLINED]: { label: 'Отклонено', color: 'error' },
  [TaskStatus.APPROVED]: { label: 'Одобрено', color: 'success' },
};

// ─── component ───────────────────────────────────────────────────────────────

interface Props {
  status: TaskStatus;
  tasks: ITask[];
  users: IUser[];
}

export const TaskColumn: React.FC<Props> = ({ status, tasks, users }) => {
  const config = STATUS_CONFIG[status];
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <ColumnPaper
      elevation={3}
      ref={setNodeRef}
      sx={{
        bgcolor: isOver ? 'action.hover' : undefined,
        transition: 'background-color 0.15s',
      }}
    >
      <ColumnHeader>
        <Chip size="small" label={config.label} color={config.color} sx={{ fontWeight: 700 }} />
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {tasks.length}
        </Typography>
      </ColumnHeader>

      <ColumnCardsList>
        {tasks.length === 0 ? (
          <Typography variant="caption" color="text.disabled" textAlign="center" py={3}>
            Нет задач
          </Typography>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} status={status} users={users} />
          ))
        )}
      </ColumnCardsList>
    </ColumnPaper>
  );
};
