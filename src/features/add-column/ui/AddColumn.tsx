import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

import { useBoardStore } from '@entities/board';
import { AddColumnActions, AddColumnButton, AddColumnPaper } from './AddColumn.styled';

export const AddColumn = () => {
  const { addColumn } = useBoardStore();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      addColumn(title.trim());
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
      <AddColumnButton startIcon={<AddIcon />} onClick={() => setIsAdding(true)}>
        Добавить список
      </AddColumnButton>
    );
  }

  return (
    <AddColumnPaper elevation={4}>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
          if (e.key === 'Escape') handleCancel();
        }}
        size="small"
        placeholder="Введите название списка..."
        autoFocus
        fullWidth
      />
      <AddColumnActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="small"
          disabled={!title.trim()}
          sx={{ textTransform: 'none' }}
        >
          Добавить список
        </Button>
        <IconButton size="small" onClick={handleCancel}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </AddColumnActions>
    </AddColumnPaper>
  );
};
