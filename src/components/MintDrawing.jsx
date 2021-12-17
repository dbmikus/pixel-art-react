import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import shortid from 'shortid';
import { useEthContext } from '../contexts/ethContext';
import * as actionCreators from '../store/actions/actionCreators';
import Button from './common/Button';
import Grid from '../utils/grid';
import { colors } from '../utils/color';

const UNTITLED_DISPLAY_NAME = '(untitled)';

const mintStates = {
  PRE_MINT: 'PRE_MINT',
  MINT_FAILURE: 'MINT_FAILURE'
};

function MintModal(props) {
  const [mintState, setMintState] = useState(mintStates.PRE_MINT);

  const { pixlyName, previewBlock, onMintSuccess } = props;
  const postMintFn = mintResult => {
    Promise.resolve(mintResult)
      .then(onMintSuccess)
      .catch(() => {
        setMintState(mintStates.MINT_FAILURE);
      });
  };

  let mintStateContent;
  switch (mintState) {
    case mintStates.PRE_MINT:
      mintStateContent = (
        <>
          Minting on Polygon
          <MintDrawing {...props} postMintFn={postMintFn} />
        </>
      );
      break;
    case mintStates.MINT_FAILURE:
      mintStateContent = (
        <>
          <MintDrawing {...props} postMintFn={postMintFn} />
          <div>Failed to mint. Please try again.</div>
        </>
      );
      break;
    default:
      console.error(`Unexpected mint state "${mintState}".`);
      throw new Error(`Unexpected mint state "${mintState}".`);
  }

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        align-items: center;

        & > * {
          margin: 2em 0;
        }
      `}
    >
      <PixlyName>{pixlyName || UNTITLED_DISPLAY_NAME}</PixlyName>
      {previewBlock}
      {mintStateContent}
    </div>
  );
}

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    activeFrame: frames.getIn(['list', activeFrameIndex]),
    pixlyName: frames.getIn(['list', activeFrameIndex, 'name']),
    frames: frames.get('list'),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    cellSize: state.present.get('cellSize'),
    paletteGridData: state.present.getIn(['palette', 'grid'])
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const MintModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MintModal);
export default MintModalContainer;

const PixlyName = styled.span`
  font-weight: bold;
`;

const MintDrawing = props => {
  const { mintFn } = useEthContext();

  const mint = () => {
    const drawingToMint = {
      activeFrame: props.activeFrame,
      frames: props.frames,
      paletteGridData: props.paletteGridData,
      cellSize: props.cellSize,
      columns: props.columns,
      rows: props.rows,
      animate: props.frames.size > 1,
      id: shortid.generate(),
      name: props.pixlyName
    };

    const grid = new Grid(drawingToMint.activeFrame, drawingToMint.columns);
    // Wrap in a promise, just in case the mintFn doesn't use one.
    const mintResult = Promise.resolve(
      mintFn(grid.toGridArray(), drawingToMint.name)
    )
      .then(function(result) {
        if (result) {
          props.actions.sendNotification(
            `Pixly "${drawingToMint.name || UNTITLED_DISPLAY_NAME}" minted`
          );
        } else {
          throw new Error('mint result falsey');
        }
        return result;
      })
      .catch(function(err) {
        props.actions.sendNotification('Error minting');
        console.error('Error minting:', err);
        throw err;
      });
    props.postMintFn(mintResult);
  };

  return (
    <div>
      <MintButton type="button" ariaLabel="Mint Pixly" onClick={mint}>
        Confirm mint
      </MintButton>
    </div>
  );
};

const MintButton = styled(Button)`
  background-color: ${colors.purple};

  padding: 0.5em 2em;
  margin-bottom: 0.6em;

  &:hover,
  &.selected {
    background-color: ${colors.darkPurple} !important;
  }
`;
