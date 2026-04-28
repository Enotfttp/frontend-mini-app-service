import type { ITask } from '@entities/task';
import { formatDateTime } from '@shared/utils/formatter';
import { Stack, Typography } from '@mui/material';

interface Props {
  task: ITask;
}

export const TaskMetaSection = ({ task }: Props) => (
  <Stack spacing={1}>
    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
      Системные поля
    </Typography>
    <Stack spacing={0.75}>
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Typography variant="caption" color="text.secondary">
          Номер задачи
        </Typography>
        <Typography variant="caption" fontWeight={600} sx={{ textAlign: 'right', wordBreak: 'break-all' }}>
          {task.taskNumber}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Typography variant="caption" color="text.secondary">
          Создано
        </Typography>
        <Typography variant="caption" fontWeight={600} sx={{ textAlign: 'right' }}>
          {formatDateTime(task.createDateTime)}
        </Typography>
      </Stack>
    </Stack>
  </Stack>
);
