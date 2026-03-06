import {
  CreatorRow,
  StyledDialogContent,
  TimeEstimateHint,
} from './CreateTaskDialog.styled';
import {
  TaskPriority,
  TaskStatus,
  TaskType,
  usePostTask,
} from '@entities/task';
import { useGetUsers } from '@entities/user';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';


// ─── display config ──────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  TaskType,
  { label: string; color: 'primary' | 'error' | 'warning' }
> = {
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

const TIME_PRESETS = ['1h', '2h', '4h', '8h', '1d', '3d', '1w', '2w', '1m'];

// ─── form state ──────────────────────────────────────────────────────────────

interface FormState {
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  todoTime: string;
  userId: string;
}

const INITIAL_FORM: FormState = {
  title: '',
  description: '',
  type: TaskType.FEATURE,
  priority: TaskPriority.MEDIUM,
  todoTime: '1h',
  userId: '',
};

// ─── component ───────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
  creatorId?: string;
}

export const CreateTaskDialog: React.FC<Props> = ({
  open,
  onClose,
  creatorId,
}) => {
  const { mutate: postTask, isPending } = usePostTask();
  const { data: users = [] } = useGetUsers();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const creator = users.find((u) => u.id === creatorId);

  useEffect(() => {
    if (open) setForm(INITIAL_FORM);
  }, [open]);

  const handleChange = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;

    postTask(
      {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        todoTime: form.todoTime,
        status: TaskStatus.CREATED,
        type: form.type,
        priority: form.priority,
        userId: form.userId || undefined,
        creatorId: creatorId || undefined,
      },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight={700}>Создать задачу</DialogTitle>

      <StyledDialogContent dividers>
        {/* Title */}
        <TextField
          label="Название задачи"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
          fullWidth
          size="small"
          autoFocus
        />

        {/* Description */}
        <TextField
          label="Описание"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          fullWidth
          size="small"
          multiline
          minRows={3}
        />

        {/* Type */}
        <FormControl size="small" fullWidth>
          <InputLabel>Тип задачи</InputLabel>
          <Select
            label="Тип задачи"
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value as TaskType)}
            renderValue={(v) => (
              <Chip
                size="small"
                label={TYPE_CONFIG[v].label}
                color={TYPE_CONFIG[v].color}
                sx={{ height: 22 }}
              />
            )}
          >
            {Object.values(TaskType).map((t) => (
              <MenuItem key={t} value={t}>
                <Chip
                  size="small"
                  label={TYPE_CONFIG[t].label}
                  color={TYPE_CONFIG[t].color}
                  sx={{ height: 22, pointerEvents: 'none' }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Priority */}
        <FormControl size="small" fullWidth>
          <InputLabel>Приоритет</InputLabel>
          <Select
            label="Приоритет"
            value={form.priority}
            onChange={(e) =>
              handleChange('priority', e.target.value as TaskPriority)
            }
            renderValue={(v) => (
              <Chip
                size="small"
                label={PRIORITY_CONFIG[v].label}
                color={PRIORITY_CONFIG[v].color}
                sx={{ height: 22 }}
              />
            )}
          >
            {Object.values(TaskPriority).map((p) => (
              <MenuItem key={p} value={p}>
                <Chip
                  size="small"
                  label={PRIORITY_CONFIG[p].label}
                  color={PRIORITY_CONFIG[p].color}
                  sx={{ height: 22, pointerEvents: 'none' }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Assignee */}
        <FormControl size="small" fullWidth>
          <InputLabel>Исполнитель</InputLabel>
          <Select
            label="Исполнитель"
            value={form.userId}
            onChange={(e) => handleChange('userId', e.target.value as string)}
            renderValue={(v) => {
              const user = users.find((u) => u.id === v);
              if (!user) return null;
              return (
                <Stack direction="row" alignItems="center" gap={1}>
                  <Avatar sx={{ width: 20, height: 20, fontSize: 11 }}>
                    {user.name[0].toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" noWrap>
                    {user.name}
                  </Typography>
                </Stack>
              );
            }}
          >
            <MenuItem value="">
              <Typography variant="body2" color="text.secondary">
                Не назначен
              </Typography>
            </MenuItem>
            {users.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Avatar sx={{ width: 28, height: 28, fontSize: 13 }}>
                    {u.name[0].toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {u.name}
                    </Typography>
                    {u.email && (
                      <Typography variant="caption" color="text.secondary">
                        {u.email}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Creator (read-only) */}
        {creator && (
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 0.5, display: 'block' }}
            >
              Создатель
            </Typography>
            <CreatorRow>
              <Avatar sx={{ width: 28, height: 28, fontSize: 13 }}>
                {creator.name[0].toUpperCase()}
              </Avatar>
              <Typography variant="body2" fontWeight={500}>
                {creator.name}
              </Typography>
            </CreatorRow>
          </Box>
        )}

        {/* Time estimate */}
        <Box>
          <TextField
            label="Оценка времени"
            value={form.todoTime}
            onChange={(e) => handleChange('todoTime', e.target.value)}
            fullWidth
            size="small"
            placeholder="1h"
          />
          <TimeEstimateHint>Формат: 1h, 2h, 1d, 1w, 1m, 1y</TimeEstimateHint>
          <Stack direction="row" flexWrap="wrap" gap={0.5} mt={1}>
            {TIME_PRESETS.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                variant={form.todoTime === t ? 'filled' : 'outlined'}
                color={form.todoTime === t ? 'primary' : 'default'}
                onClick={() => handleChange('todoTime', t)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Box>
      </StyledDialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
          sx={{ textTransform: 'none' }}
        >
          Отмена
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!form.title.trim() || isPending}
          sx={{ textTransform: 'none' }}
        >
          {isPending ? 'Создание...' : 'Создать'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
