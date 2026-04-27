import * as React from 'react';

export interface ModalContextType {
  openModal: (
    content: React.ReactNode,
    title?: string,
    customWidth?: string,
    buttons?: React.ReactNode,
  ) => void;
  /** Закрыть модалку и убрать `modal` из URL (если он есть). */
  closeModal: () => void;
  /** Только сбросить содержимое портала, без навигации (синхронизация с URL без модалки). */
  dismissModal: () => void;
}

export const ModalContext = React.createContext<ModalContextType | undefined>(undefined);

export const useModalContext = (): ModalContextType => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
