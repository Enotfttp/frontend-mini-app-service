import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
  gap: 10px;
  font-family: inherit;
`;

export const ErrorIcon = styled.span`
  font-size: 72px;
  line-height: 1;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  animation: bounce 2s infinite;
`;

export const ErrorTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
`;

export const ErrorDescription = styled.p`
  font-size: 16px;
  color: #4a5568;
  margin: 0;
`;

export const StyledErrorAction = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
  margin-top: 16px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export const PrimaryButton = styled.button`
  background-color: #2563eb;
  color: #ffffff;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const SecondaryButton = styled.button`
  background-color: #f1f5f9;
  color: #374151;

  &:hover {
    background-color: #e2e8f0;
  }
`;

export const StyledErrorDetails = styled.details`
  margin-top: 15px;
  text-align: left;

  summary {
    cursor: pointer;
    color: #718096;
    font-size: 14px;
    margin-bottom: 8px;
  }

  pre {
    background: #f7fafc;
    padding: 12px;
    border-radius: 6px;
    font-size: 12px;
    overflow-x: auto;
    border: 1px solid #e2e8f0;
    color: #4a5568;
  }
`;
