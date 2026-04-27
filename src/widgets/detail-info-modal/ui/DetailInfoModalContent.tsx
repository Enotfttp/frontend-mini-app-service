import { useGetTask } from '@entities/task';
import { TaskPriority, TaskStatus, TaskType } from '@entities/task';
import { StyleBox } from './DetailInfoModal.styled';
import { Alert, Chip, Divider, Stack, Typography } from '@mui/material';

export interface DetailInfoModalContentProps {
  params: Record<string, string>;
}

export const DetailInfoModalContent = ({ params }: DetailInfoModalContentProps) => {
  const { id, type } = params;
  if (!id) throw new Error('id is required');
  const { data: task, isLoading, isError } = useGetTask(id);

  const statusLabel: Record<TaskStatus, string> = {
    [TaskStatus.CREATED]: 'Создана',
    [TaskStatus.IN_PROGRESS]: 'В работе',
    [TaskStatus.DECLINED]: 'Отклонена',
    [TaskStatus.APPROVED]: 'Завершена',
  };

  const typeLabel: Record<TaskType, string> = {
    [TaskType.FEATURE]: 'Feature',
    [TaskType.BUG]: 'Bug',
    [TaskType.HOTFIX]: 'Hotfix',
  };

  const priorityLabel: Record<TaskPriority, string> = {
    [TaskPriority.LOW]: 'Низкий',
    [TaskPriority.MEDIUM]: 'Средний',
    [TaskPriority.HIGH]: 'Высокий',
    [TaskPriority.CRITICAL]: 'Критический',
  };

  const infoRows = [
    { label: 'ID', value: task?.id },
    { label: 'Тип источника', value: type || 'task' },
    { label: 'Дедлайн', value: task?.todoTime },
    { label: 'Создано', value: task?.createDateTime },
  ];

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

  return (
    <StyleBox>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>
            {task.title}
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip
              size="small"
              label={statusLabel[task.status]}
              color="info"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            <Chip
              size="small"
              label={typeLabel[task.type]}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            <Chip
              size="small"
              label={priorityLabel[task.priority]}
              color="warning"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Stack>
        </Stack>

        <Divider />

        <Stack spacing={0.75}>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
            Описание
          </Typography>
          <Typography id="detail-info-modal-description" variant="body2" color="text.secondary">
            {task.description || 'Описание отсутствует'}
          </Typography>
        </Stack>

        <Stack
          spacing={1}
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: (theme) => theme.palette.action.hover,
          }}
        >
          {infoRows.map((row) => (
            <Stack key={row.label} direction="row" justifyContent="space-between" gap={1.5}>
              <Typography variant="caption" color="text.secondary">
                {row.label}
              </Typography>
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ textAlign: 'right', wordBreak: 'break-word' }}
              >
                {row.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </StyleBox>
  );
};
