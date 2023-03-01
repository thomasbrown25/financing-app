import styled, { keyframes } from 'styled-components';
import { Button } from 'semantic-ui-react';

export const BaseButton = styled.button`
  /* text-transform: uppercase; */
  /* font-family: 'Open Sans, sans-serif'; */
`;

export const GoogleSignInButton = styled(Button)`
  margin: 1em 0 0 !important;
  /* background-color: red !important;
    &:hover {
        background-color: darkred !important;
        border: none !important;
    } */
`;

const DelayAnimation = keyframes`
    0% { opacity: 0 }
    100% { opacity: 1 }
`;

export const AuthResponse = styled.p`
  color: #ff3333;
  border: 0.2rem solid #ff3333;
  border-radius: 0.3rem;
  padding: 0.5rem;
  font-weight: 700;
  animation: ${DelayAnimation} 2s 1;

  @media (min-width: 480px) {
    padding: 0px 50px;
  }
`;
