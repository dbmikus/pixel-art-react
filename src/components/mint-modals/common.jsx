import React from 'react';
import styled from 'styled-components';

export const UNTITLED_DISPLAY_NAME = '(untitled)';

export const PixlyName = styled.span`
  font-weight: bold;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 2em 0;
  }
`;

export function Preview({ pixlyName, previewBlock }) {
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        align-items: center;

        & > * {
          margin: 0.5em 0;
        }
      `}
    >
      <PixlyName>{pixlyName || UNTITLED_DISPLAY_NAME}</PixlyName>
      {previewBlock}
    </div>
  );
}
