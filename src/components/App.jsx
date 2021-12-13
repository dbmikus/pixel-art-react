import React from 'react';
import CookieConsent from 'react-cookie-consent';
import styled from 'styled-components';
import Button from './common/Button';
import PreviewBox from './PreviewBox';
import PixelCanvasContainer from './PixelCanvas';
import CellSizeContainer from './CellSize';
import ColorPickerContainer from './ColorPicker';
import ModalContainer from './Modal';
import DimensionsContainer from './Dimensions';
import KeyBindings from './KeyBindings';
import CssDisplayContainer from './CssDisplay';
import DurationContainer from './Duration';
import EraserContainer from './Eraser';
import BucketContainer from './Bucket';
import MoveContainer from './Move';
import EyedropperContainer from './Eyedropper';
import FramesHandlerContainer from './FramesHandler';
import PaletteGridContainer from './PaletteGrid';
import ResetContainer from './Reset';
import SaveDrawingContainer from './SaveDrawing';
import MintDrawingContainer from './MintDrawing';
import NewProjectContainer from './NewProject';
import SimpleNotificationContainer from './SimpleNotification';
import SimpleSpinnerContainer from './SimpleSpinner';
import CellsInfo from './CellsInfo';
import UndoRedoContainer from './UndoRedo';
import initialSetup from '../utils/startup';
import drawHandlersProvider from '../utils/drawHandlersProvider';
import { colors } from '../utils/color';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: null,
      modalOpen: false,
      helpOn: false
    };
    Object.assign(this, drawHandlersProvider(this));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    initialSetup(dispatch, localStorage);
  }

  changeModalType(type) {
    this.setState({
      modalType: type,
      modalOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false
    });
  }

  toggleHelp() {
    const { helpOn } = this.state;
    this.setState({ helpOn: !helpOn });
  }

  renderCopyCssButton({ helpOn }) {
    const renderButton = false;
    if (!renderButton) {
      return null;
    }

    return (
      <button
        type="button"
        className="app__copycss-button"
        onClick={() => {
          this.changeModalType('copycss');
        }}
        data-tooltip={helpOn ? 'Check your CSS generated code' : null}
      >
        css
      </button>
    );
  }

  renderIOControls({ helpOn }) {
    const doRender = false;
    if (!doRender) {
      return null;
    }

    return (
      <div className="app__mobile--group">
        <div data-tooltip={helpOn ? 'New project' : null}>
          <NewProjectContainer />
        </div>
        <div className="app__load-save-container">
          <button
            type="button"
            className="app__load-button"
            onClick={() => {
              this.changeModalType('load');
            }}
            data-tooltip={helpOn ? 'Load projects you stored before' : null}
          >
            LOAD
          </button>
          <div data-tooltip={helpOn ? 'Save your project' : null}>
            <SaveDrawingContainer />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { helpOn, modalType, modalOpen } = this.state;
    const { className } = this.props;
    return (
      <div
        className={`${className} pixel-art-react-container app app__main`}
        onMouseUp={this.onMouseUp}
        onTouchEnd={this.onMouseUp}
        onTouchCancel={this.onMouseUp}
      >
        <SimpleSpinnerContainer />
        <SimpleNotificationContainer
          fadeInTime={1000}
          fadeOutTime={1500}
          duration={1500}
        />
        <StyledAppFramesContainer
          data-tooltip={
            helpOn
              ? `Create an awesome animation sequence.
              You can modify the duration of each frame, changing its own value.
              The number indicates where the frame ends in a range from 0 to 100.
              `
              : null
          }
        >
          <FramesHandlerContainer />
        </StyledAppFramesContainer>
        <StyledCentralContainer>
          <LeftControls
            helpOn={helpOn}
            helpClickFn={() => {
              this.toggleHelp();
            }}
            keyBindingsClickFn={() => {
              this.changeModalType('keybindings');
            }}
            copyCssClickFn={() => {
              this.changeModalType('copycss');
            }}
            isCssCopyButtonRendered={false}
            loadClickFn={() => {
              this.changeModalType('load');
            }}
            isIOControlsRendered={false}
          />
          <PixelCanvasWrapper>
            <PixelCanvasContainer
              drawHandlersFactory={this.drawHandlersFactory}
            />
          </PixelCanvasWrapper>
          <StyledRightControls
            helpOn={helpOn}
            downloadClickFn={() => {
              this.changeModalType('download');
            }}
            previewClickFn={() => {
              this.changeModalType('preview');
            }}
          />
        </StyledCentralContainer>
        <div className="css-container">
          <CssDisplayContainer />
        </div>
        <CookieConsent
          location="bottom"
          buttonText="Got it!"
          cookieName="pixelartcssCookiesAccepted"
          style={{
            background: '#313131',
            fontSize: '13px',
            textAlign: 'center'
          }}
          buttonStyle={{
            background: '#bbbbbb',
            color: '#4e503b',
            fontSize: '13px'
          }}
          contentStyle={{
            flex: '1 0 200px',
            margin: '15px'
          }}
          expires={150}
        >
          By continuing to use this website you are giving consent to cookies
          being used. Thank you.
          <a
            href="/cookies"
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ textDecoration: 'none', color: '#5786c1' }}
          >
            {' '}
            Learn more
          </a>
        </CookieConsent>
        <ModalContainer
          type={modalType}
          isOpen={modalOpen}
          close={() => {
            this.closeModal();
          }}
          open={() => {
            this.changeModalType(modalType);
          }}
        />
      </div>
    );
  }
}

const StyledApp = styled(App)`
  background-color: ${colors.darkBg1};
`;
export default StyledApp;

const StyledAppFramesContainer = styled.div`
  margin-bottom: 1em;

  &[data-tooltip]:after {
    width: 80%;
    margin-left: -40%;
  }

  @media only screen and (min-width: 730px) {
    /*
    Fix small vertical scrollbar glitch for some resolutions
    inside frames-handler
    Detected in Chrome
    */
    &:-webkit-scrollbar,
    & div::-webkit-scrollbar {
      width: 1em !important;
    }
  }

  @media only screen and (max-width: 740px) {
    margin-bottom: 0;
  }
`;

const StyledCentralContainer = styled.div`
  padding: 2rem 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  & > * {
    flex-grow: 1;
    margin-bottom: 2em;
  }

  @media only screen and (max-width: 740px) {
    flex-direction: column;
    padding-top: 0;
  }
`;

function LeftControls({
  helpOn,
  keyBindingsClickFn,
  helpClickFn,
  copyCssClickFn,
  isCssCopyButtonRendered,
  loadClickFn,
  isIOControlsRendered
}) {
  return (
    <StyledLeftControls>
      {/* <div className="app__mobile--container max-width-container"> */}
      <div className="app__mobile--container">
        {isIOControlsRendered ? (
          <IOControls helpOn={helpOn} loadClickFn={loadClickFn} />
        ) : null}
        <StyledDrawingControls helpOn={helpOn} />
      </div>
      {/* <LeftSecondControls className="app__left-wide app__mobile--container max-width-container"> */}
      <LeftSecondControls>
        <div className="app__mobile--group">
          <PaletteGridContainer />
        </div>
        <div className="app__mobile--group">
          {isCssCopyButtonRendered ? (
            <button
              type="button"
              className="app__copycss-button"
              onClick={copyCssClickFn}
              data-tooltip={helpOn ? 'Check your CSS generated code' : null}
            >
              css
            </button>
          ) : null}
        </div>
        <div className="app__mobile--group">
          <div className="app__social-container">
            <div className="app__help-container">
              <div data-tooltip="Toggle help tooltips">
                <button
                  type="button"
                  aria-label="Help"
                  className={`app__toggle-help-button
                          ${helpOn ? ' selected' : ''}`}
                  onClick={helpClickFn}
                />
              </div>
              <div data-tooltip={helpOn ? 'Show keyboard shortcuts' : null}>
                <KeyBindings onClick={keyBindingsClickFn} />
              </div>
            </div>
          </div>
        </div>
      </LeftSecondControls>
    </StyledLeftControls>
  );
}

const StyledLeftControls = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 740px) {
    flex-direction: column;
  }
`;

const LeftSecondControls = styled.div`
  max-width: 12em;
  margin-left: 1.5em;

  @media only screen and (max-width: 740px) {
    margin: auto;
  }
`;

function DrawingControls({ helpOn, className }) {
  return (
    <div className={`${className} app__mobile--group`}>
      <div
        data-tooltip={
          helpOn
            ? 'It fills an area of the current frame based on color similarity (B)'
            : null
        }
      >
        <BucketContainer />
      </div>
      <div
        data-tooltip={helpOn ? 'Sample a color from your drawing (O)' : null}
      >
        <EyedropperContainer />
      </div>
      <div
        data-tooltip={
          helpOn ? 'Choose a new color that is not in your palette (P)' : null
        }
      >
        <ColorPickerContainer />
      </div>
      <div data-tooltip={helpOn ? 'Remove colors (E)' : null}>
        <EraserContainer />
      </div>
      <div
        data-tooltip={helpOn ? 'Move your drawing around the canvas (M)' : null}
      >
        <MoveContainer />
      </div>
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

function IOControls({ helpOn, loadClickFn }) {
  return (
    <div className="app__mobile--group">
      <div data-tooltip={helpOn ? 'New project' : null}>
        <NewProjectContainer />
      </div>
      <div className="app__load-save-container">
        <button
          type="button"
          className="app__load-button"
          onClick={loadClickFn}
          data-tooltip={helpOn ? 'Load projects you stored before' : null}
        >
          LOAD
        </button>
        <div data-tooltip={helpOn ? 'Save your project' : null}>
          <SaveDrawingContainer />
        </div>
      </div>
    </div>
  );
}

const PixelCanvasWrapper = styled.div`
  // TODO(dbmikus) [#10] This is a hack to prevent the grid from horizontally
  // overflowing on mobile. However, it slightly compresses the pixels so they
  // are not square.
  max-width: 95%;

  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 1050px) {
    min-width: 50%;
  }
`;

function RightControls({ className, helpOn, previewClickFn, downloadClickFn }) {
  return (
    <div className={`app__right-side ${className}`}>
      <RightControlsInnerContainer>
        <StyledRightControlsMain
          {...{ helpOn, previewClickFn, downloadClickFn }}
        />
        <div data-tooltip={helpOn ? 'Mint art' : null}>
          <MintDrawingContainer />
        </div>
      </RightControlsInnerContainer>
    </div>
  );
}

const StyledRightControls = styled(RightControls)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RightControlsInnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  // @media only screen and (max-width: 1050px) {
  //   flex-direction: row;
  //   align-items: center;

  //   & > *:first-child {
  //     margin-right: 1.5em;
  //   }
  // }
`;

function RightControlsMain({
  className,
  helpOn,
  previewClickFn,
  downloadClickFn
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
      {/* <div className="app__mobile--group max-width-container-centered"> */}
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
      </div>
    </div>
  );
}

const StyledRightControlsMain = styled(RightControlsMain)`
  max-width: 20em;
  padding: 4em;
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
