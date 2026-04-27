import { ModalContext } from './ModalContext';
import { stripModalSearchParams } from './stripModalSearchParams';
import { ErrorBoundary } from '@app/providers';
import { Modal, Typography } from '@mui/material';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { ModalWrapper } from './Modal.styled';

interface ModalState {
  content: React.ReactNode;
  title: string;
  customWidth?: string;
  isOpen: boolean;
  buttons?: React.ReactNode;
}

const emptyState: ModalState = {
  content: null,
  title: '',
  customWidth: undefined,
  isOpen: false,
  buttons: undefined,
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalState, setModalState] = React.useState<ModalState>(emptyState);

  const dismissModal = React.useCallback(() => {
    setModalState(emptyState);
  }, []);

  const openModal = React.useCallback(
    (content: React.ReactNode, title = '', customWidth?: string, buttons?: React.ReactNode) => {
      setModalState({
        content,
        title,
        customWidth,
        isOpen: true,
        buttons,
      });
    },
    [],
  );

  const closeModal = React.useCallback(() => {
    dismissModal();
    const sp = new URLSearchParams(location.search);
    if (!sp.has('modal')) {
      return;
    }
    navigate(
      {
        pathname: location.pathname,
        search: stripModalSearchParams(location.search),
      },
      { replace: true },
    );
  }, [dismissModal, navigate, location.pathname, location.search]);

  const renderModal = () => {
    if (!modalState.isOpen || !modalState.content) return null;

    const modalContent = <ErrorBoundary>{modalState.content}</ErrorBoundary>;

    return createPortal(
      <Modal
        open={modalState.isOpen}
        onClose={closeModal}
        {...(modalState.title
          ? { 'aria-labelledby': 'app-modal-title' as const }
          : { 'aria-label': 'Диалог' as const })}
        slotProps={{
          backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.5)' } },
        }}
      >
        <ModalWrapper $customWidth={modalState.customWidth ?? 'auto'}>
          {modalState.title ? (
            <Typography id="app-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
              {modalState.title}
            </Typography>
          ) : null}
          {modalContent}
          {modalState.buttons}
          </ModalWrapper>
      </Modal>,
      document.body,
    );
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, dismissModal }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};
