import styled from "styled-components";

export const ColoredButton = styled.button`
  color: white;
  background-color: var(--accent);
  padding: 8px 16px;
  border-radius: 6px;
  margin: 0 5px 5px 0;
  font-weight: 600;
  transition: 0.3s filter ease-in-out;
  cursor: pointer;

  &:hover {
    filter: brightness(92%);
  }
`;
