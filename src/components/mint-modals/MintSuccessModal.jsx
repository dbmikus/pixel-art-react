import React from 'react';
import { connect } from 'react-redux';
import { ModalContainer, Preview } from './common';

function MintSuccessModal({ pixlyName, mintResultNode, previewBlock }) {
  return (
    <ModalContainer>
      <Preview pixlyName={pixlyName} previewBlock={previewBlock} />
      <div>
        <div>Transaction completed!</div>
        <div>Share your Pixly!</div>
        {mintResultNode}
      </div>
    </ModalContainer>
  );
}

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    pixlyName: frames.getIn(['list', activeFrameIndex, 'name'])
  };
};

const MintSuccessModalContainer = connect(mapStateToProps)(MintSuccessModal);
export default MintSuccessModalContainer;
