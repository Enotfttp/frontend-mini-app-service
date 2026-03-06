import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useMemo, useState } from 'react';

import { ICard, IColumn, useBoardStore } from '@entities/board';
import { AddColumn } from '@features/add-column';

import { KanbanCard } from './KanbanCard';
import { KanbanColumn } from './KanbanColumn';
import { BoardContainer } from './KanbanBoard.styled';

type ActiveItem =
  | { type: 'card'; data: ICard; columnId: string }
  | { type: 'column'; data: IColumn }
  | null;

export const KanbanBoard = () => {
  const { columns, moveCard, moveColumn } = useBoardStore();
  const [activeItem, setActiveItem] = useState<ActiveItem>(null);

  const columnIds = useMemo(() => columns.map((c) => c.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  // Always read from store to avoid stale closure between rapid DragOver events
  const findColumnByCardId = (cardId: string) =>
    useBoardStore.getState().columns.find((col) => col.cardIds.includes(cardId));

  const handleDragStart = ({ active }: DragStartEvent) => {
    const type = active.data.current?.type as 'card' | 'column';
    if (type === 'card') {
      setActiveItem({
        type: 'card',
        data: active.data.current!.card as ICard,
        columnId: active.data.current!.columnId as string,
      });
    } else {
      setActiveItem({ type: 'column', data: active.data.current!.column as IColumn });
    }
  };

  /**
   * Кросс-колоночное перемещение карточки.
   * Обновляет store сразу (в real-time) для плавной анимации.
   */
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.id === over.id) return;
    if (active.data.current?.type !== 'card') return;

    const activeCardId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumnByCardId(activeCardId);
    const { columns: freshColumns } = useBoardStore.getState();
    const overColumn =
      over.data.current?.type === 'column'
        ? freshColumns.find((c) => c.id === overId)
        : findColumnByCardId(overId);

    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return;

    const overIndex =
      over.data.current?.type === 'card'
        ? overColumn.cardIds.indexOf(overId)
        : overColumn.cardIds.length;

    moveCard(
      activeCardId,
      activeColumn.id,
      overColumn.id,
      overIndex >= 0 ? overIndex : overColumn.cardIds.length,
    );
  };

  /**
   * Финальная позиция:
   * — сортировка карточек внутри одной колонки
   * — сортировка самих колонок
   */
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveItem(null);
    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type as 'card' | 'column';
    const overType = over.data.current?.type as 'card' | 'column';

    if (activeType === 'column' && overType === 'column') {
      const { columns: latestColumns } = useBoardStore.getState();
      const fromIdx = latestColumns.findIndex((c) => c.id === active.id);
      const toIdx = latestColumns.findIndex((c) => c.id === over.id);
      if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
        moveColumn(fromIdx, toIdx);
      }
      return;
    }

    if (activeType === 'card' && overType === 'card') {
      const activeCardId = active.id as string;
      const overCardId = over.id as string;
      const activeColumn = findColumnByCardId(activeCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (activeColumn && overColumn && activeColumn.id === overColumn.id) {
        const fromIdx = activeColumn.cardIds.indexOf(activeCardId);
        const toIdx = activeColumn.cardIds.indexOf(overCardId);
        if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
          moveCard(activeCardId, activeColumn.id, activeColumn.id, toIdx);
        }
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <BoardContainer>
        <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column} />
          ))}
        </SortableContext>

        <AddColumn />
      </BoardContainer>

      <DragOverlay>
        {activeItem?.type === 'card' && (
          <KanbanCard card={activeItem.data} columnId={activeItem.columnId} isDragOverlay />
        )}
        {activeItem?.type === 'column' && (
          <KanbanColumn column={activeItem.data} isDragOverlay />
        )}
      </DragOverlay>
    </DndContext>
  );
};
