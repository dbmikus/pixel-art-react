import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ColorPickerContainer from './ColorPicker';
import EraserContainer from './Eraser';
import BucketContainer from './Bucket';
import MoveContainer from './Move';
import EyedropperContainer from './Eyedropper';
import * as drawingToolStates from '../store/reducers/drawingToolStates';
import { colors } from '../utils/color';

function DrawingControls({ selectedTool, helpOn, className }) {
  return (
    <div className={`${className} app__mobile--group`}>
      <ToolWrapper isSelected={selectedTool === drawingToolStates.BUCKET}>
        <BucketContainer
          helpOn={helpOn}
          helpTooltip="It fills an area of the current frame based on color similarity (B)"
        />
      </ToolWrapper>
      <ToolWrapper isSelected={selectedTool === drawingToolStates.EYEDROPPER}>
        <EyedropperContainer
          helpOn={helpOn}
          helpTooltip="Sample a color from your drawing (O)"
        />
      </ToolWrapper>
      <ToolWrapper isSelected={selectedTool === drawingToolStates.COLOR_PICKER}>
        <ColorPickerContainer
          helpOn={helpOn}
          helpTooltip="Choose a new color that is not in your palette (P)"
        />
      </ToolWrapper>
      <ToolWrapper isSelected={selectedTool === drawingToolStates.ERASER}>
        <EraserContainer helpOn={helpOn} helpTooltip="Remove colors (E)" />
      </ToolWrapper>
      <ToolWrapper isSelected={selectedTool === drawingToolStates.MOVE}>
        <MoveContainer
          helpOn={helpOn}
          helpTooltip="Move your drawing around the canvas (M)"
        />
      </ToolWrapper>
    </div>
  );
}

const mapStateToProps = state => ({
  selectedTool: state.present.get('drawingTool')
});
const ConnectedDrawingControls = connect(mapStateToProps)(DrawingControls);

const StyledDrawingControls = styled(ConnectedDrawingControls)`
  text-align: center;
  margin: 1em 0 0.6em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  background-color: ${colors.darkBg0};
  padding: 0.8em;

  & > * {
    margin: 1em 0;
  }

  @media only screen and (max-width: 740px) {
    margin-top: 0;
    flex-direction: row;

    & > * {
      margin: 0;
    }
  }
`;

function halfCircleCss(size, color) {
  const doubleSize = size * 2;
  const ret = `
        background-color: ${color};
        display: inline-block;
        height: ${doubleSize}px;
        width: ${size}px;
        border-bottom-right-radius: ${doubleSize}px;
        border-top-right-radius: ${doubleSize}px;
    `;
  return ret;
}

const ToolWrapper = styled.div.attrs(() => ({
  size: 7,
  color: 'white'
}))`
  position: relative;

  ${props =>
    props.isSelected
      ? `&:before {
        content: '';

        ${halfCircleCss(props.size, props.color)};

        // height: 10px;
        // width: 10px;
        // border-radius: 50%;
        // display: inline-block;

        position: absolute;
        transform: translate(-50%, -50%);
        left: -0.6em;
        top: 50%;

        @media only screen and (max-width: 740px) {
            transform: translate(-50%, -50%) rotate(90deg);
            left: 50%;
            top: -0.6em;
        }
    }`
      : null}
`;

export default StyledDrawingControls;
