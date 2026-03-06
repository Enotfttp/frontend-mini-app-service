export enum CardStatus {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  DECLINED = 'DECLINED',
  APPROVED = 'APPROVED',
}

export enum CardType {
  FEATURE = 'FEATURE',
  BUG = 'BUG',
  HOTFIX = 'HOTFIX',
}

export interface ICardDetail {
  id: string;
  title: string;
  description?: string;
  storyPoints?: number;
  assigneeId?: string;
  status: CardStatus;
  type: CardType;
  columnId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUpdateCardPayload {
  title?: string;
  description?: string;
  storyPoints?: number;
  assigneeId?: string | null;
  status?: CardStatus;
  type?: CardType;
}
