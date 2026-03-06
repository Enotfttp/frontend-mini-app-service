import { NotFoundPage } from '../errorBoundary/NotFoundPage';
import { RouterErrorBoundary } from '../errorBoundary/RouterErrorBoundary';
import { routesPath } from './routesPath';
import { BoardPage } from '@pages/index';
import React from 'react';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
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
];
