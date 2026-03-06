import {
  ErrorContainer,
  ErrorDescription,
  ErrorIcon,
  ErrorTitle,
  PrimaryButton,
  SecondaryButton,
  StyledErrorAction,
} from './RouterErrorBoundary.styled';
import { routesPath } from '../config/routesPath';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(routesPath.root);
    }
  };

  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>Упс! Что-то пошло не так</ErrorTitle>
      <ErrorDescription>Страница не найдена</ErrorDescription>

      <StyledErrorAction>
        <PrimaryButton onClick={() => navigate(routesPath.root)}>
          На главную
        </PrimaryButton>
        <SecondaryButton onClick={handleGoBack}>
          Вернуться на предыдущую страницу
        </SecondaryButton>
      </StyledErrorAction>
    </ErrorContainer>
  );
};
