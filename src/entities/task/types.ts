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

export interface ITaskComment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface ITask {
  id: string;
  taskNumber: number;
  title: string;
  description?: string;
  createDateTime: string;
  todoTime: string;
  status: TaskStatus;
  type: TaskType;
  priority: TaskPriority;
  userId?: string;
  creatorId?: string;
  comments?: ITaskComment[];
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

export interface ICreateTaskCommentPayload {
  userId: string;
  text: string;
}
