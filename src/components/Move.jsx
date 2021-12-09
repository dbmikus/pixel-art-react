import React from 'react';
import { connect } from 'react-redux';
import { switchTool } from '../store/actions/actionCreators';
import { MOVE } from '../store/reducers/drawingToolStates';
import IconButton from './IconButton';

const Move = ({ moveOn, switchMove }) => (
  <IconButton
    type="button"
    aria-label="Move Tool"
    isSelected={moveOn}
    onClick={switchMove}
    content={'\\69'}
  />
);

const mapStateToProps = state => ({
  moveOn: state.present.get('drawingTool') === MOVE
});

const switchMoveAction = switchTool(MOVE);
const mapDispatchToProps = dispatch => ({
  switchMove: () => dispatch(switchMoveAction)
});

const MoveContainer = connect(mapStateToProps, mapDispatchToProps)(Move);
export default MoveContainer;
