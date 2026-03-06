import { arrayMove } from '@dnd-kit/sortable';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ICard, IColumn } from './types';

interface BoardStore {
  columns: IColumn[];
  cards: Record<string, ICard>;

  addColumn: (title: string) => void;
  updateColumnTitle: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;

  addCard: (columnId: string, title: string) => void;
  updateCard: (cardId: string, updates: Partial<Pick<ICard, 'title' | 'description'>>) => void;
  deleteCard: (cardId: string, columnId: string) => void;

  moveCard: (
    activeCardId: string,
    fromColumnId: string,
    toColumnId: string,
    toIndex: number,
  ) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;
}

const INITIAL_COLUMNS: IColumn[] = [
  { id: 'col-1', title: 'To Do', cardIds: ['card-1', 'card-2', 'card-3'] },
  { id: 'col-2', title: 'In Progress', cardIds: ['card-4', 'card-5'] },
  { id: 'col-3', title: 'Done', cardIds: ['card-6'] },
];

const INITIAL_CARDS: Record<string, ICard> = {
  'card-1': { id: 'card-1', title: 'Настроить структуру проекта' },
  'card-2': {
    id: 'card-2',
    title: 'Спроектировать схему БД',
    description: 'Нарисовать ER-диаграмму',
  },
  'card-3': { id: 'card-3', title: 'Написать требования' },
  'card-4': {
    id: 'card-4',
    title: 'Разработать REST API',
    description: 'GET /api/boards, POST /api/cards',
  },
  'card-5': { id: 'card-5', title: 'Настроить CI/CD' },
  'card-6': { id: 'card-6', title: 'Провести code review' },
};

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      columns: INITIAL_COLUMNS,
      cards: INITIAL_CARDS,

      addColumn: (title) =>
        set((state) => ({
          columns: [
            ...state.columns,
            { id: `col-${Date.now()}`, title, cardIds: [] },
          ],
        })),

      updateColumnTitle: (columnId, title) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === columnId ? { ...col, title } : col,
          ),
        })),

      deleteColumn: (columnId) =>
        set((state) => {
          const column = state.columns.find((c) => c.id === columnId);
          if (!column) return state;
          const newCards = { ...state.cards };
          column.cardIds.forEach((id) => delete newCards[id]);
          return {
            columns: state.columns.filter((c) => c.id !== columnId),
            cards: newCards,
          };
        }),

      addCard: (columnId, title) =>
        set((state) => {
          const cardId = `card-${Date.now()}`;
          return {
            cards: { ...state.cards, [cardId]: { id: cardId, title } },
            columns: state.columns.map((col) =>
              col.id === columnId
                ? { ...col, cardIds: [...col.cardIds, cardId] }
                : col,
            ),
          };
        }),

      updateCard: (cardId, updates) =>
        set((state) => ({
          cards: {
            ...state.cards,
            [cardId]: { ...state.cards[cardId], ...updates },
          },
        })),

      deleteCard: (cardId, columnId) =>
        set((state) => {
          const newCards = { ...state.cards };
          delete newCards[cardId];
          return {
            cards: newCards,
            columns: state.columns.map((col) =>
              col.id === columnId
                ? { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) }
                : col,
            ),
          };
        }),

      moveCard: (activeCardId, fromColumnId, toColumnId, toIndex) =>
        set((state) => {
          const columns = state.columns.map((c) => ({
            ...c,
            cardIds: [...c.cardIds],
          }));
          const fromCol = columns.find((c) => c.id === fromColumnId);
          const toCol = columns.find((c) => c.id === toColumnId);
          if (!fromCol || !toCol) return state;

          const fromIndex = fromCol.cardIds.indexOf(activeCardId);
          if (fromIndex === -1) return state;

          if (fromColumnId === toColumnId) {
            fromCol.cardIds = arrayMove(fromCol.cardIds, fromIndex, toIndex);
          } else {
            fromCol.cardIds.splice(fromIndex, 1);
            toCol.cardIds.splice(toIndex, 0, activeCardId);
          }

          return { columns };
        }),

      moveColumn: (fromIndex, toIndex) =>
        set((state) => ({
          columns: arrayMove(state.columns, fromIndex, toIndex),
        })),
    }),
    { name: 'mini-app-board' },
  ),
);
