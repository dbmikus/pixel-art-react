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
            `Drawing "${drawingToMint.name}" minted`
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
        MINT PIXLY!
      </MintButton>
    </div>
  );
};

const MintButton = styled(Button)`
  background-color: ${colors.purple};

  width: 100%;
  padding: 0.5em;
  margin-bottom: 0.6em;

  &:hover,
  &.selected {
    background-color: ${colors.darkPurple} !important;
  }
`;

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

const MintDrawingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MintDrawing);
export default MintDrawingContainer;
