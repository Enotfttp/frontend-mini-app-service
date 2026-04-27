import { ModalProvider, ModalRouteHandler } from '@features/modal-routing';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const AppShellWithModals: React.FC = () => (
  <ModalProvider>
    <ModalRouteHandler />
    <Outlet />
  </ModalProvider>
);
