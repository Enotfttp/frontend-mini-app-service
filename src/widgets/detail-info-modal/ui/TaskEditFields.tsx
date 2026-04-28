import type { ITask, IUpdateTaskPayload } from '@entities/task';
import { TaskPriority, TaskStatus, TaskType } from '@entities/task';
import type { IUser } from '@entities/user';
import { formatDateTime } from '@shared/utils/formatter';
import {
  PRIORITY_CHIP,
  PRIORITY_LABEL,
  STATUS_CHIP,
  STATUS_LABEL,
  taskToFormValues,
  TYPE_CHIP,
  TYPE_LABEL,
  type TaskFormValues,
} from '../lib/taskFormConfig';
import { EditableFormRow } from './EditableFormRow';
import {
  Avatar,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Form } from 'react-final-form';

interface TaskEditFieldsProps {
  task: ITask;
  users: IUser[];
  dataUpdatedAt: number;
  onSavePatch: (payload: IUpdateTaskPayload) => Promise<void>;
  assigneeLabel: (userId: string) => string;
}

export const TaskEditFields = ({
  task,
  users,
  dataUpdatedAt,
  onSavePatch,
  assigneeLabel,
}: TaskEditFieldsProps) => (
  <Form<TaskFormValues>
    key={`${task.id}_${dataUpdatedAt}`}
    initialValues={taskToFormValues(task)}
    onSubmit={() => undefined}
    render={() => (
      <Stack spacing={0.5}>
        <EditableFormRow<string>
          name="title"
          required
          onApply={(v) => onSavePatch({ title: v.trim() })}
          formatDisplay={(v) => (
            <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>
              {v}
            </Typography>
          )}
        >
          {({ value, onChange }) => (
            <TextField
              size="small"
              fullWidth
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Название задачи"
            />
          )}
        </EditableFormRow>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 0.25, mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            № {task.taskNumber}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDateTime(task.createDateTime)}
          </Typography>
        </Stack>

        <Divider sx={{ my: 0.5 }} />

        <EditableFormRow<string>
          name="description"
          label="Описание"
          onApply={(v) => onSavePatch({ description: v.trim() || undefined })}
          formatDisplay={(v) => (
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
              {v || '—'}
            </Typography>
          )}
        >
          {({ value, onChange }) => (
            <TextField
              size="small"
              fullWidth
              multiline
              minRows={3}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Описание"
            />
          )}
        </EditableFormRow>

        <EditableFormRow<string>
          name="todoTime"
          label="Оценка времени"
          required
          onApply={(v) => onSavePatch({ todoTime: v.trim() })}
          formatDisplay={(v) => (
            <Typography variant="body2" fontWeight={500}>
              {v}
            </Typography>
          )}
        >
          {({ value, onChange }) => (
            <TextField
              size="small"
              fullWidth
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="1h, 2d, 1w"
            />
          )}
        </EditableFormRow>

        <EditableFormRow<TaskStatus>
          name="status"
          label="Статус"
          required
          onApply={(v) => onSavePatch({ status: v })}
          formatDisplay={(v) => (
            <Chip size="small" label={STATUS_LABEL[v]} color={STATUS_CHIP[v]} variant="outlined" />
          )}
        >
          {({ value, onChange }) => (
            <FormControl size="small" fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select label="Статус" value={value} onChange={(e) => onChange(e.target.value as TaskStatus)}>
                {Object.values(TaskStatus).map((s) => (
                  <MenuItem key={s} value={s}>
                    {STATUS_LABEL[s]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </EditableFormRow>

        <EditableFormRow<TaskType>
          name="type"
          label="Тип"
          required
          onApply={(v) => onSavePatch({ type: v })}
          formatDisplay={(v) => (
            <Chip size="small" label={TYPE_LABEL[v]} color={TYPE_CHIP[v]} variant="outlined" />
          )}
        >
          {({ value, onChange }) => (
            <FormControl size="small" fullWidth>
              <InputLabel>Тип</InputLabel>
              <Select label="Тип" value={value} onChange={(e) => onChange(e.target.value as TaskType)}>
                {Object.values(TaskType).map((t) => (
                  <MenuItem key={t} value={t}>
                    {TYPE_LABEL[t]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </EditableFormRow>

        <EditableFormRow<TaskPriority>
          name="priority"
          label="Приоритет"
          required
          onApply={(v) => onSavePatch({ priority: v })}
          formatDisplay={(v) => (
            <Chip size="small" label={PRIORITY_LABEL[v]} color={PRIORITY_CHIP[v]} variant="outlined" />
          )}
        >
          {({ value, onChange }) => (
            <FormControl size="small" fullWidth>
              <InputLabel>Приоритет</InputLabel>
              <Select label="Приоритет" value={value} onChange={(e) => onChange(e.target.value as TaskPriority)}>
                {Object.values(TaskPriority).map((p) => (
                  <MenuItem key={p} value={p}>
                    {PRIORITY_LABEL[p]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </EditableFormRow>

        <EditableFormRow<string>
          name="userId"
          label="Исполнитель"
          onApply={(v) => onSavePatch({ userId: v.trim() || undefined })}
          formatDisplay={(v) => (
            <Stack direction="row" alignItems="center" gap={1}>
              {v ? (
                <>
                  <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                    {(assigneeLabel(v)[0] ?? '?').toUpperCase()}
                  </Avatar>
                  <Typography variant="body2">{assigneeLabel(v)}</Typography>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Не назначен
                </Typography>
              )}
            </Stack>
          )}
        >
          {({ value, onChange }) => (
            <FormControl size="small" fullWidth>
              <InputLabel>Исполнитель</InputLabel>
              <Select
                label="Исполнитель"
                value={value}
                onChange={(e) => onChange(e.target.value as string)}
                displayEmpty
              >
                <MenuItem value="">
                  <Typography variant="body2" color="text.secondary">
                    Не назначен
                  </Typography>
                </MenuItem>
                {users.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </EditableFormRow>

      </Stack>
    )}
  />
);
