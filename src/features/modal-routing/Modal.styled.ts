import styled from '@emotion/styled';

export const ModalWrapper = styled.div<{ $customWidth: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  width: ${({ $customWidth }) => $customWidth};
  max-width: min(calc(100vw - 32px), 760px);
  max-height: calc(100vh - 32px);
  overflow: auto;
  border-radius: 14px;
  background: #ffffff;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.25),
    0 8px 10px -6px rgba(0, 0, 0, 0.2);
  padding: 18px 20px;
`;