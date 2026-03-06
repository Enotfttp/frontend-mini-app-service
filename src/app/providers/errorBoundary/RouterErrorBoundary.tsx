import {
  ErrorContainer,
  ErrorDescription,
  ErrorIcon,
  ErrorTitle,
  PrimaryButton,
  SecondaryButton,
  StyledErrorAction,
  StyledErrorDetails,
} from './RouterErrorBoundary.styled';
import * as React from 'react';
import { useRouteError } from 'react-router-dom';

export const RouterErrorBoundary = () => {
  const error = useRouteError() as Error & { status: number };

  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>Упс! Что-то пошло не так</ErrorTitle>
      <ErrorDescription>
        {error?.status === 404
          ? 'Страница не найдена'
          : 'Произошла непредвиденная ошибка'}
      </ErrorDescription>

      <StyledErrorAction>
        <PrimaryButton onClick={() => (window.location.href = '/')}>
          На главную
        </PrimaryButton>
        <SecondaryButton onClick={() => window.location.reload()}>
          Обновить страницу
        </SecondaryButton>
      </StyledErrorAction>

      {import.meta.env.VITE_APP_STAND === 'development' && error && (
        <StyledErrorDetails>
          <summary>Детали ошибки (только для разработки)</summary>
          <pre>{error.message}</pre>
        </StyledErrorDetails>
      )}
    </ErrorContainer>
  );
};
