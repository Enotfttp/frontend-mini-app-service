import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

import { useBoardStore } from '@entities/board';
import { AddCardActions, AddCardButton, AddCardForm } from './AddCard.styled';

interface Props {
  columnId: string;
}

export const AddCard: React.FC<Props> = ({ columnId }) => {
  const { addCard } = useBoardStore();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      addCard(columnId, title.trim());
      setTitle('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <AddCardButton
        startIcon={<AddIcon />}
        onClick={() => setIsAdding(true)}
        fullWidth
        size="small"
      >
        Добавить карточку
      </AddCardButton>
    );
  }

  return (
    <AddCardForm>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
          if (e.key === 'Escape') handleCancel();
        }}
        size="small"
        placeholder="Введите название карточки..."
        autoFocus
        fullWidth
        multiline
        minRows={2}
      />
      <AddCardActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="small"
          disabled={!title.trim()}
          sx={{ textTransform: 'none' }}
        >
          Добавить
        </Button>
        <IconButton size="small" onClick={handleCancel}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </AddCardActions>
    </AddCardForm>
  );
};
