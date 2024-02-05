import styled, { css } from "styled-components";

export const ChooseFile = styled.div`
  max-width: 260px;
  > span {
    text-decoration: underline;
    color: #106ec5;
    display: inline-block;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
  }
`;

export const InputWrapper = styled.div`
  border-radius: 4px;
  padding: 10px;
  border: 2px dashed #cccccc;
  ${(p) =>
    p.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`;
