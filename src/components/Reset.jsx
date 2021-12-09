import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { resetGrid } from '../store/actions/actionCreators';
import IconButton from './IconButton';

const Reset = ({ resetGridDispatch }) => (
  <ResetIconButton
    type="button"
    onClick={resetGridDispatch}
    aria-label="Reset painting"
    content={'\\74'}
  />
);

const ResetIconButton = styled(IconButton)`
  color: #ffffff;
  background-color: #7c2828;
`;

const mapDispatchToProps = dispatch => ({
  resetGridDispatch: () => dispatch(resetGrid())
});

const ResetContainer = connect(null, mapDispatchToProps)(Reset);
export default ResetContainer;
