export enum TaskStatus {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  DECLINED = 'DECLINED',
  APPROVED = 'APPROVED',
}

export enum TaskType {
  FEATURE = 'FEATURE',
  BUG = 'BUG',
  HOTFIX = 'HOTFIX',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  createDateTime: string;
  todoTime: string;
  status: TaskStatus;
  type: TaskType;
  priority: TaskPriority;
  userId?: string;
  creatorId?: string;
}

export interface ICreateTaskPayload {
  title: string;
  description?: string;
  todoTime: string;
  status: TaskStatus;
  type: TaskType;
  priority: TaskPriority;
  userId?: string;
  creatorId?: string;
}

export interface IUpdateTaskPayload {
  title?: string;
  description?: string;
  todoTime?: string;
  status?: TaskStatus;
  type?: TaskType;
  priority?: TaskPriority;
  userId?: string;
}
