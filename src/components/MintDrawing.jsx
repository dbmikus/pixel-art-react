import React from 'react';
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
    mintFn(grid.toGridArray(), drawingToMint.name)
      .then(function(result) {
        if (result) {
          props.actions.sendNotification(
            `Pixly "${drawingToMint.name || UNTITLED_DISPLAY_NAME}" minted`
          );
        } else {
          props.actions.sendNotification('Error minting');
        }
      })
      .catch(function(err) {
        props.actions.sendNotification('Error minting');
        console.log('Error minting:', err);
      });
  };

  return (
    <div>
      <MintButton type="button" ariaLabel="Mint Pixly" onClick={mint}>
        CONFIRM MINT
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

function MintModal(props) {
  const { pixlyName } = props;

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
      <MintDrawing {...props} />
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
