import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setFrameName } from '../store/actions/actionCreators';
import Button from './common/Button';
import PreviewBox from './PreviewBox';
import CellSizeContainer from './CellSize';
import DimensionsContainer from './Dimensions';
import DurationContainer from './Duration';
import ResetContainer from './Reset';
import MintDrawingContainer from './MintDrawing';
import CellsInfo from './CellsInfo';
import UndoRedoContainer from './UndoRedo';
import { colors } from '../utils/color';

function RightControls({
  className,
  helpOn,
  previewClickFn,
  downloadClickFn,
  setPixlyName,
  pixlyName
}) {
  return (
    <div className={`app__right-side ${className}`}>
      <RightControlsInnerContainer>
        <StyledRightControlsMain
          {...{
            helpOn,
            previewClickFn,
            downloadClickFn,
            setPixlyName,
            pixlyName
          }}
        />
        <div data-tooltip={helpOn ? 'Mint art' : null}>
          <MintDrawingContainer />
        </div>
      </RightControlsInnerContainer>
    </div>
  );
}

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    pixlyName: frames.getIn(['list', activeFrameIndex, 'name'], '')
  };
};

const mapDispatchToProps = dispatch => ({
  setPixlyName: newName => {
    dispatch(setFrameName(newName));
  }
});

const ConnectedRightControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(RightControls);

const StyledRightControls = styled(ConnectedRightControls)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RightControlsInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function RightControlsMain({
  className,
  helpOn,
  previewClickFn,
  downloadClickFn,
  pixlyName,
  setPixlyName
}) {
  return (
    <div className={`app__mobile--container ${className}`}>
      <div className="app__mobile--group">
        <PreviewBox helpOn={helpOn} callback={previewClickFn} />
        <CellsInfo />
        <div
          data-tooltip={helpOn ? 'Number of columns and rows' : null}
          className="max-width-container-centered"
        >
          <DimensionsContainer />
        </div>
      </div>
      <div className="app__mobile--group">
        <div data-tooltip={helpOn ? 'Size of one tile in px' : null}>
          <CellSizeContainer />
        </div>
        <div data-tooltip={helpOn ? 'Animation duration in seconds' : null}>
          <DurationContainer />
        </div>
        <div data-tooltip={helpOn ? 'Undo (CTRL+Z) Redo (CTRL+Y)' : null}>
          <UndoRedoContainer />
        </div>
        <div
          data-tooltip={helpOn ? 'Reset the selected frame' : null}
          className="max-width-container-centered"
        >
          <ResetContainer />
        </div>
        <div
          data-tooltip={
            helpOn ? 'Download your creation in different formats' : null
          }
        >
          <Button
            type="button"
            ariaLabel="Download"
            className="app__download-button"
            onClick={downloadClickFn}
          />
        </div>
        <div css="margin-top: 1em">
          <input
            css="padding: 0.25em;"
            type="text"
            placeholder="Name of Pixly"
            value={pixlyName}
            onChange={event => setPixlyName(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

const StyledRightControlsMain = styled(RightControlsMain)`
  max-width: 20em;
  padding: 2em;
  background-color: ${colors.darkBg0};
  margin-bottom: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 1050px) {
    flex-direction: row;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
  }

  @media only screen and (max-width: 415px) {
    flex-direction: column;
  }
`;

export default StyledRightControls;
