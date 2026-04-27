import { useModalContext } from './ModalContext';
import { isModalRouteName, modalRouteConfig } from './modalRouteConfig';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ModalRouteHandler = () => {
  const location = useLocation();
  const { openModal, dismissModal } = useModalContext();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modalName = searchParams.get('modal');

    if (modalName && isModalRouteName(modalName)) {
      const config = modalRouteConfig[modalName];
      const params = Object.fromEntries(searchParams.entries());

      openModal(
        <config.component params={params} />,
        config.title,
        config.customWidth,
      );
    } else {
      dismissModal();
    }
  }, [location.search, openModal, dismissModal]);

  return null;
};
