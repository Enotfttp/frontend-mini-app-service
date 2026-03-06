import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Chip, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { ITask, TaskPriority, TaskType, useDeleteTask } from '@entities/task';
import { IUser } from '@entities/user';

import {
  DeleteTaskButton,
  TaskCardContent,
  TaskCardFooter,
  TaskCardHeader,
  TaskCardMeta,
  TaskCardPaper,
} from './TaskBoard.styled';

// ─── display config ──────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<TaskType, { label: string; color: 'primary' | 'error' | 'warning' }> = {
  [TaskType.FEATURE]: { label: 'Feature', color: 'primary' },
  [TaskType.BUG]: { label: 'Bug', color: 'error' },
  [TaskType.HOTFIX]: { label: 'Hotfix', color: 'warning' },
};

const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; color: 'success' | 'info' | 'warning' | 'error' }
> = {
  [TaskPriority.LOW]: { label: 'Низкий', color: 'success' },
  [TaskPriority.MEDIUM]: { label: 'Средний', color: 'info' },
  [TaskPriority.HIGH]: { label: 'Высокий', color: 'warning' },
  [TaskPriority.CRITICAL]: { label: 'Критический', color: 'error' },
};

// ─── component ───────────────────────────────────────────────────────────────

interface Props {
  task: ITask;
  users: IUser[];
}

export const TaskCard: React.FC<Props> = ({ task, users }) => {
  const { mutate: removeTask } = useDeleteTask();

  const assignee = users.find((u) => u.id === task.userId);
  const shortId = task.id.length > 8 ? task.id.slice(0, 8).toUpperCase() : task.id;

  return (
    <TaskCardPaper elevation={2} sx={{ '&:hover': { boxShadow: 6 } }}>
      <TaskCardContent>
        {/* Header: ID + delete */}
        <TaskCardHeader>
          <Typography variant="caption" color="text.secondary" fontFamily="monospace">
            #{shortId}
          </Typography>
          <DeleteTaskButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              removeTask(task.id);
            }}
          >
            <DeleteIcon sx={{ fontSize: 15 }} />
          </DeleteTaskButton>
        </TaskCardHeader>

        {/* Title */}
        <Typography variant="body2" fontWeight={600} sx={{ wordBreak: 'break-word', lineHeight: 1.4 }}>
          {task.title}
        </Typography>

        {/* Description */}
        {task.description && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {task.description}
          </Typography>
        )}

        {/* Type + Priority chips */}
        <TaskCardMeta>
          <Chip
            size="small"
            label={TYPE_CONFIG[task.type].label}
            color={TYPE_CONFIG[task.type].color}
            sx={{ height: 20, fontSize: 11 }}
          />
          <Chip
            size="small"
            label={PRIORITY_CONFIG[task.priority].label}
            color={PRIORITY_CONFIG[task.priority].color}
            sx={{ height: 20, fontSize: 11 }}
          />
        </TaskCardMeta>

        {/* Footer: time + assignee */}
        <TaskCardFooter>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {task.todoTime}
            </Typography>
          </Stack>

          {assignee ? (
            <Tooltip title={assignee.name}>
              <Avatar sx={{ width: 22, height: 22, fontSize: 11 }}>
                {assignee.name[0].toUpperCase()}
              </Avatar>
            </Tooltip>
          ) : (
            <Typography variant="caption" color="text.disabled">
              Не назначен
            </Typography>
          )}
        </TaskCardFooter>
      </TaskCardContent>
    </TaskCardPaper>
  );
};
