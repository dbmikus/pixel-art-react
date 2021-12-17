import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ModalContainer, Preview } from './common';
import Button from '../common/Button';
import TwitterLogo from '../svg/TwitterLogo';
import { colors } from '../../utils/color';

function MintSuccessModal({ pixlyName, mintResultNode, previewBlock }) {
  const twitterAriaLabel = 'share to Twitter';

  return (
    <ModalContainer>
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
        <div>Transaction completed!</div>
        <Share>
          <ShareButton ariaLabel={twitterAriaLabel}>
            Share your Pixly!
          </ShareButton>
          <span css="text-align: center;">
            <TwitterLogo height={40} alt={twitterAriaLabel} />
          </span>
        </Share>
      </div>
      <Preview pixlyName={pixlyName} previewBlock={previewBlock} />
      {mintResultNode}
    </ModalContainer>
  );
}

const Share = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > * {
    margin: 0 0.5em;
  }
`;

const ShareButton = styled(Button)`
  background-color: ${colors.purple};
  font-size: 20px;

  padding: 0.5em 2em;

  &:hover,
  &.selected {
    background-color: ${colors.darkPurple} !important;
  }
`;

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    pixlyName: frames.getIn(['list', activeFrameIndex, 'name'])
  };
};

const MintSuccessModalContainer = connect(mapStateToProps)(MintSuccessModal);
export default MintSuccessModalContainer;
