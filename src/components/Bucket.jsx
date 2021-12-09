import React from 'react';
import { connect } from 'react-redux';
import { switchTool } from '../store/actions/actionCreators';
import { BUCKET } from '../store/reducers/drawingToolStates';
import IconButton from './IconButton';

const Bucket = ({ bucketOn, switchBucket }) => (
  <IconButton
    type="button"
    aria-label="Paint Bucket Tool"
    isSelected={bucketOn}
    onClick={switchBucket}
    content={'\\6e'}
  />
);

const mapStateToProps = state => ({
  bucketOn: state.present.get('drawingTool') === BUCKET
});

const switchBucketAction = switchTool(BUCKET);
const mapDispatchToProps = dispatch => ({
  switchBucket: () => dispatch(switchBucketAction)
});

const BucketContainer = connect(mapStateToProps, mapDispatchToProps)(Bucket);
export default BucketContainer;
