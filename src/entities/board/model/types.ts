export interface ICard {
  id: string;
  title: string;
  description?: string;
}

export interface IColumn {
  id: string;
  title: string;
  cardIds: string[];
}
