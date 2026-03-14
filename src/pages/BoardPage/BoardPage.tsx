import DarkModeIcon from '@mui/icons-material/DarkMode';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { useThemeStore } from '@shared/lib/theme';
import { TaskBoard } from '@widgets/task-board';

import { PageWrapper, StyledAppBar } from './BoardPage.styled';

export const BoardPage = () => {
  const { mode, toggleMode } = useThemeStore();
  console.log("qwe",import.meta.env + "/api");
  return (
    <PageWrapper>
      <StyledAppBar position="static" elevation={0}>
        <Toolbar variant="dense">
          <DashboardIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
            Task Board
          </Typography>
          <Tooltip title={mode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}>
            <IconButton onClick={toggleMode} color="inherit" size="small">
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </StyledAppBar>
12312312312
      <TaskBoard />
    </PageWrapper>
  );
};
