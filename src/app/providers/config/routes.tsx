import { NotFoundPage } from '../errorBoundary/NotFoundPage';
import { RouterErrorBoundary } from '../errorBoundary/RouterErrorBoundary';
import { AppShellWithModals } from '../modal-layer/AppShellWithModals';
import { routesPath } from './routesPath';
import { BoardPage } from '@pages/index';
import React from 'react';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    element: <AppShellWithModals />,
    children: [
      {
        path: routesPath.root,
        element: <BoardPage />,
        errorElement: <RouterErrorBoundary />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
        errorElement: <RouterErrorBoundary />,
      },
    ],
  },
];
