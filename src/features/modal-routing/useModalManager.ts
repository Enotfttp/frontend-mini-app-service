import { stripModalSearchParams } from './stripModalSearchParams';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface OpenModalOptions {
  params?: Record<string, string>;
  preserveExistingParams?: boolean;
}

/** Открытие/закрытие через query: `?modal=…` и плоские `params`; при закрытии чистятся `paramKeys` из `modalRouteConfig`. */
export const useModalManager = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = useCallback(
    (modalName: string, options: OpenModalOptions = {}) => {
      const { params = {}, preserveExistingParams = true } = options;

      const searchParams = new URLSearchParams(preserveExistingParams ? location.search : '');

      searchParams.set('modal', modalName);

      Object.entries(params).forEach(([key, value]) => {
        searchParams.set(key, value);
      });

      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    },
    [navigate, location.pathname, location.search],
  );

  const closeModal = useCallback(() => {
    navigate(
      {
        pathname: location.pathname,
        search: stripModalSearchParams(location.search),
      },
      { replace: true },
    );
  }, [navigate, location.pathname, location.search]);

  const getModalParam = useCallback(
    (paramName: string): string | null => {
      const searchParams = new URLSearchParams(location.search);
      return searchParams.get(paramName);
    },
    [location.search],
  );

  const isModalOpen = useCallback(
    (modalName?: string): boolean => {
      const searchParams = new URLSearchParams(location.search);
      const currentModal = searchParams.get('modal');

      if (!modalName) return !!currentModal;
      return currentModal === modalName;
    },
    [location.search],
  );

  const currentModal = new URLSearchParams(location.search).get('modal');

  return {
    openModal,
    closeModal,
    getModalParam,
    isModalOpen,
    currentModal,
  };
};
