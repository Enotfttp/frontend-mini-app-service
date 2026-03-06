import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TextField, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';

import { IColumn, useBoardStore } from '@entities/board';
import { AddCard } from '@features/add-card';

import { KanbanCard } from './KanbanCard';
import {
  CardsList,
  ColumnFooter,
  ColumnHeader,
  ColumnPaper,
  DeleteColumnButton,
  DragHandle,
} from './KanbanColumn.styled';

interface Props {
  column: IColumn;
  isDragOverlay?: boolean;
}

export const KanbanColumn: React.FC<Props> = ({ column, isDragOverlay }) => {
  const { cards, deleteColumn, updateColumnTitle } = useBoardStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(column.title);

  const columnCards = useMemo(
    () => column.cardIds.map((id) => cards[id]).filter(Boolean),
    [column.cardIds, cards],
  );

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: column.id,
      data: { type: 'column', column },
      disabled: isDragOverlay,
    });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (titleValue.trim() && titleValue !== column.title) {
      updateColumnTitle(column.id, titleValue.trim());
    } else {
      setTitleValue(column.title);
    }
  };

  return (
    <ColumnPaper
      ref={setNodeRef}
      style={style}
      elevation={isDragOverlay ? 8 : 3}
    >
      {/* Шапка */}
      <ColumnHeader>
        <DragHandle {...attributes} {...listeners}>
          <DragIndicatorIcon fontSize="small" />
        </DragHandle>

        {isEditingTitle ? (
          <TextField
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleBlur();
              if (e.key === 'Escape') {
                setTitleValue(column.title);
                setIsEditingTitle(false);
              }
            }}
            size="small"
            autoFocus
            fullWidth
            sx={{ '& .MuiInputBase-input': { fontWeight: 700, py: '4px' } }}
          />
        ) : (
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              px: 0.5,
              py: 0.25,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => setIsEditingTitle(true)}
          >
            {column.title}
            <Typography
              component="span"
              variant="caption"
              color="text.secondary"
              fontWeight={400}
              sx={{ ml: 0.75 }}
            >
              {column.cardIds.length}
            </Typography>
          </Typography>
        )}

        <DeleteColumnButton size="small" onClick={() => deleteColumn(column.id)}>
          <DeleteIcon fontSize="small" />
        </DeleteColumnButton>
      </ColumnHeader>

      {/* Список карточек */}
      <CardsList>
        <SortableContext items={column.cardIds} strategy={verticalListSortingStrategy}>
          {columnCards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              columnId={column.id}
              isDragOverlay={isDragOverlay}
            />
          ))}
        </SortableContext>
      </CardsList>

      {/* Добавить карточку */}
      <ColumnFooter>
        <AddCard columnId={column.id} />
      </ColumnFooter>
    </ColumnPaper>
  );
};
