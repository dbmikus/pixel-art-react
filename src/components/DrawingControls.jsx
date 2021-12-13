import React from 'react';
import styled from 'styled-components';
import ColorPickerContainer from './ColorPicker';
import EraserContainer from './Eraser';
import BucketContainer from './Bucket';
import MoveContainer from './Move';
import EyedropperContainer from './Eyedropper';
import { colors } from '../utils/color';

function DrawingControls({ helpOn, className }) {
  return (
    <div className={`${className} app__mobile--group`}>
      <BucketContainer
        helpOn={helpOn}
        helpTooltip="It fills an area of the current frame based on color similarity (B)"
      />
      <EyedropperContainer
        helpOn={helpOn}
        helpTooltip="Sample a color from your drawing (O)"
      />
      <ColorPickerContainer
        helpOn={helpOn}
        helpTooltip="Choose a new color that is not in your palette (P)"
      />
      <EraserContainer helpOn={helpOn} helpTooltip="Remove colors (E)" />
      <MoveContainer
        helpOn={helpOn}
        helpTooltip="Move your drawing around the canvas (M)"
      />
    </div>
  );
}

const StyledDrawingControls = styled(DrawingControls)`
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

export default StyledDrawingControls;
