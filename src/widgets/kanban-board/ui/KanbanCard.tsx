import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DeleteIcon from '@mui/icons-material/Delete';
import SubjectIcon from '@mui/icons-material/Subject';
import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { ICard, useBoardStore } from '@entities/board';
import { useSelectedCardStore } from '@entities/card';
import {
  CardTextContent,
  DeleteCardButton,
  DescriptionRow,
  StyledCard,
  StyledCardContent,
} from './KanbanCard.styled';

interface Props {
  card: ICard;
  columnId: string;
  isDragOverlay?: boolean;
}

export const KanbanCard: React.FC<Props> = ({ card, columnId, isDragOverlay }) => {
  const { deleteCard, updateCard } = useBoardStore();
  const { openCard } = useSelectedCardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(card.title);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: card.id,
      data: { type: 'card', card, columnId },
      disabled: isDragOverlay,
    });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (titleValue.trim() && titleValue !== card.title) {
      updateCard(card.id, { title: titleValue.trim() });
    } else {
      setTitleValue(card.title);
    }
  };

  const handleCardClick = () => {
    if (!isDragging && !isDragOverlay && !isEditing) {
      openCard(card.id);
    }
  };

  return (
    <StyledCard
      ref={setNodeRef}
      style={{ ...style, cursor: isDragging ? 'grabbing' : 'grab' }}
      elevation={isDragOverlay ? 12 : 2}
      sx={{ '&:hover': { boxShadow: 6 } }}
      onClick={handleCardClick}
      {...attributes}
      {...listeners}
    >
      <StyledCardContent>
        <CardTextContent>
          {isEditing ? (
            <TextField
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) handleTitleBlur();
                if (e.key === 'Escape') {
                  setTitleValue(card.title);
                  setIsEditing(false);
                }
              }}
              size="small"
              fullWidth
              multiline
              autoFocus
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{ wordBreak: 'break-word', lineHeight: 1.4 }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              {card.title}
            </Typography>
          )}

          {card.description && !isEditing && (
            <DescriptionRow>
              <SubjectIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3 }}>
                {card.description}
              </Typography>
            </DescriptionRow>
          )}
        </CardTextContent>

        <DeleteCardButton
          size="small"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            deleteCard(card.id, columnId);
          }}
        >
          <DeleteIcon sx={{ fontSize: 15 }} />
        </DeleteCardButton>
      </StyledCardContent>
    </StyledCard>
  );
};
