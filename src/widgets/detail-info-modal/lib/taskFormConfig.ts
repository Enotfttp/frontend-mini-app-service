import type { ITask } from '@entities/task';
import { TaskPriority, TaskStatus, TaskType } from '@entities/task';

export interface TaskFormValues {
  taskNumber: number;
  title: string;
  description: string;
  todoTime: string;
  status: TaskStatus;
  type: TaskType;
  priority: TaskPriority;
  userId: string;
}

export const STATUS_LABEL: Record<TaskStatus, string> = {
  [TaskStatus.CREATED]: 'Создана',
  [TaskStatus.IN_PROGRESS]: 'В работе',
  [TaskStatus.DECLINED]: 'Отклонена',
  [TaskStatus.APPROVED]: 'Завершена',
};

export const TYPE_LABEL: Record<TaskType, string> = {
  [TaskType.FEATURE]: 'Feature',
  [TaskType.BUG]: 'Bug',
  [TaskType.HOTFIX]: 'Hotfix',
};

export const PRIORITY_LABEL: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: 'Низкий',
  [TaskPriority.MEDIUM]: 'Средний',
  [TaskPriority.HIGH]: 'Высокий',
  [TaskPriority.CRITICAL]: 'Критический',
};

export const STATUS_CHIP: Record<
  TaskStatus,
  'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
> = {
  [TaskStatus.CREATED]: 'default',
  [TaskStatus.IN_PROGRESS]: 'info',
  [TaskStatus.DECLINED]: 'error',
  [TaskStatus.APPROVED]: 'success',
};

export const TYPE_CHIP: Record<TaskType, 'primary' | 'error' | 'warning'> = {
  [TaskType.FEATURE]: 'primary',
  [TaskType.BUG]: 'error',
  [TaskType.HOTFIX]: 'warning',
};

export const PRIORITY_CHIP: Record<TaskPriority, 'success' | 'info' | 'warning' | 'error'> = {
  [TaskPriority.LOW]: 'success',
  [TaskPriority.MEDIUM]: 'info',
  [TaskPriority.HIGH]: 'warning',
  [TaskPriority.CRITICAL]: 'error',
};

export function taskToFormValues(task: ITask): TaskFormValues {
  return {
    taskNumber: task.taskNumber,
    title: task.title,
    description: task.description ?? '',
    todoTime: task.todoTime,
    status: task.status,
    type: task.type,
    priority: task.priority,
    userId: task.userId ?? '',
  };
}
