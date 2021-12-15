import React from 'react';
import CookieConsent from 'react-cookie-consent';
import styled from 'styled-components';
import PixelCanvasContainer from './PixelCanvas';
import ModalContainer, { modalTypes } from './Modal';
import DrawingControls from './DrawingControls';
import RightControls from './RightControls';
import KeyBindings from './KeyBindings';
import CssDisplayContainer from './CssDisplay';
import FramesHandlerContainer from './FramesHandler';
import PaletteGridContainer from './PaletteGrid';
import SaveDrawingContainer from './SaveDrawing';
import NewProjectContainer from './NewProject';
import SimpleNotificationContainer from './SimpleNotification';
import SimpleSpinnerContainer from './SimpleSpinner';
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
          this.changeModalType(modalTypes.COPY_CSS);
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
              this.changeModalType(modalTypes.LOAD);
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
              this.changeModalType(modalTypes.KEYBINDINGS);
            }}
            copyCssClickFn={() => {
              this.changeModalType(modalTypes.COPY_CSS);
            }}
            isCssCopyButtonRendered={false}
            loadClickFn={() => {
              this.changeModalType(modalTypes.LOAD);
            }}
            isIOControlsRendered={false}
          />
          <PixelCanvasWrapper>
            <PixelCanvasContainer
              drawHandlersFactory={this.drawHandlersFactory}
            />
          </PixelCanvasWrapper>
          <RightControls
            helpOn={helpOn}
            downloadClickFn={() => {
              this.changeModalType(modalTypes.DOWNLOAD);
            }}
            previewClickFn={() => {
              this.changeModalType(modalTypes.PREVIEW);
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
      <div className="app__mobile--container">
        {isIOControlsRendered ? (
          <IOControls helpOn={helpOn} loadClickFn={loadClickFn} />
        ) : null}
        <DrawingControls helpOn={helpOn} />
      </div>
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
