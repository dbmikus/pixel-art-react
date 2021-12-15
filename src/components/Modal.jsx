import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalReact from 'react-modal';
import styled from 'styled-components';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock';
import * as actionCreators from '../store/actions/actionCreators';

import RadioSelector from './RadioSelector';
import LoadDrawing from './LoadDrawing';
import Preview from './Preview';
import CopyCSS from './CopyCSS';
import DownloadDrawing from './DownloadDrawing';
import KeyBindingsLegend from './KeyBindingsLegend';
import Button from './common/Button';

export const modalTypes = {
  COPY_CSS: 'copycss',
  LOAD: 'load',
  KEYBINDINGS: 'keybindings',
  DOWNLOAD: 'download',
  PREVIEW: 'preview'
};

class Modal extends React.Component {
  static generateRadioOptions(props) {
    let options;

    if (props.type !== modalTypes.LOAD) {
      options = [
        {
          value: 'single',
          description: 'single',
          labelFor: 'single',
          id: 3
        }
      ];

      if (props.frames.size > 1) {
        const spritesheetSupport =
          props.type === modalTypes.DOWNLOAD || props.type === 'twitter';
        const animationOptionLabel = spritesheetSupport ? 'GIF' : 'animation';

        const animationOption = {
          value: 'animation',
          description: animationOptionLabel,
          labelFor: animationOptionLabel,
          id: 4
        };
        options.push(animationOption);

        if (spritesheetSupport) {
          options.push({
            value: 'spritesheet',
            description: 'spritesheet',
            labelFor: 'spritesheet',
            id: 5
          });
        }
      }
    } else {
      options = [
        {
          value: 'storage',
          description: 'Stored',
          labelFor: 'stored',
          id: 0
        },
        {
          value: 'loadImgFile',
          description: 'Load From Image',
          labelFor: 'load-img-file',
          id: 1
        },
        {
          value: 'import',
          description: 'Import',
          labelFor: 'import',
          id: 2
        },
        {
          value: 'export',
          description: 'Export',
          labelFor: 'export',
          id: 3
        },
        {
          value: 'extractData',
          description: 'Useful Data',
          labelFor: 'useful-data',
          id: 4
        }
      ];
    }

    return options;
  }

  constructor(props) {
    super(props);
    this.state = {
      previewType: 'single',
      loadType: 'storage'
    };
    this.modalBodyRef = React.createRef();
    this.modalContainerRef = React.createRef();
    this.showModal = () => disableBodyScroll(this.modalContainerRef.current);
    this.closeModal = () => {
      enableBodyScroll(this.modalContainerRef.current);
      props.close();
    };
    this.changeRadioType = this.changeRadioType.bind(this);
    this.scrollTop = () => this.modalBodyRef.current.scrollTo(0, 0);
    ModalReact.setAppElement('body');
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  getModalContent(props) {
    const { previewType, loadType } = this.state;
    const options = this.constructor.generateRadioOptions(props);
    let content;
    const previewBlock = (
      <>
        {previewType !== 'spritesheet' ? (
          <div className="modal__preview--wrapper">
            <Preview
              key="0"
              frames={props.frames}
              columns={props.columns}
              rows={props.rows}
              cellSize={props.type === modalTypes.PREVIEW ? props.cellSize : 5}
              duration={props.duration}
              activeFrameIndex={props.activeFrameIndex}
              animate={previewType === 'animation'}
            />
          </div>
        ) : null}
      </>
    );
    const isLoadModal = props.type === modalTypes.LOAD;
    const radioType = isLoadModal ? 'load' : modalTypes.PREVIEW;
    let radioOptions = (
      <div className={`modal__${radioType}`}>
        <RadioSelector
          name={`${radioType}-type`}
          selected={isLoadModal ? loadType : previewType}
          change={this.changeRadioType}
          options={options}
        />
      </div>
    );

    switch (props.type) {
      case modalTypes.LOAD:
        content = (
          <LoadDrawing
            loadType={loadType}
            close={this.closeModal}
            open={props.open}
            frames={props.frames}
            columns={props.columns}
            rows={props.rows}
            cellSize={props.cellSize}
            paletteGridData={props.paletteGridData}
            actions={{
              setDrawing: props.actions.setDrawing,
              sendNotification: props.actions.sendNotification
            }}
          />
        );
        break;
      case modalTypes.COPY_CSS:
        content = (
          <>
            {previewBlock}
            <CopyCSS
              frames={props.frames}
              columns={props.columns}
              rows={props.rows}
              cellSize={props.cellSize}
              activeFrameIndex={props.activeFrameIndex}
              animationCode={previewType !== 'single'}
              duration={props.duration}
            />
          </>
        );
        break;
      case modalTypes.DOWNLOAD:
        content = (
          <>
            {previewBlock}
            <DownloadDrawing
              frames={props.frames}
              activeFrame={props.activeFrame}
              columns={props.columns}
              rows={props.rows}
              cellSize={props.cellSize}
              duration={props.duration}
              downloadType={previewType}
              actions={{ sendNotification: props.actions.sendNotification }}
            />
          </>
        );
        break;
      case modalTypes.KEYBINDINGS:
        content = (
          <>
            <KeyBindingsLegend />
          </>
        );
        radioOptions = null;
        break;
      default:
        content = <>{previewBlock}</>;
        break;
    }

    return (
      <div className={props.className}>
        <div className="modal__header">
          <CloseButton
            ariaLabel="close modal"
            type="button"
            onClick={this.closeModal}
          >
            x
          </CloseButton>
        </div>
        {radioOptions}
        <div className="modal__body" ref={this.modalBodyRef}>
          {content}
        </div>
      </div>
    );
  }

  changeRadioType(value, type) {
    const newState = {};
    this.scrollTop();
    switch (type) {
      case 'load-type':
        newState.loadType = value;
        break;
      default:
        newState.previewType = value;
    }
    this.setState(newState);
  }

  render() {
    const { isOpen, type } = this.props;
    const styles = {
      content: {
        overflow: 'hidden',
        display: 'flex'
      }
    };

    return (
      <ModalReact
        isOpen={isOpen}
        onRequestClose={this.closeModal}
        onAfterOpen={this.showModal}
        ref={this.modalContainerRef}
        style={styles}
        contentLabel={`Dialog ${type || ''}`}
      >
        {this.getModalContent(this.props)}
      </ModalReact>
    );
  }
}

const StyledModal = styled(Modal)`
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
    Helvetica, Arial, 'Lucida Grande', sans-serif;

  display: flex;
  flex: 1;
  flex-direction: column;
  .modal__header {
    text-align: right;
    padding-bottom: 1em;
  }
  .preview {
    margin: 0 auto;
  }
  .modal__body {
    overflow: auto;
    overflow-x: hidden;
  }
  .modal__preview,
  .modal__load {
    .modal__preview--wrapper {
      margin: 1em auto;
      display: table;
    }
  }

  .modal__load,
  .modal__preview,
  .modal__body {
    fieldset {
      padding: 1em 0;

      label {
        margin: 1em 0.5em;
        display: inline-block;
      }
    }
  }
`;

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    frames: frames.get('list'),
    activeFrameIndex,
    activeFrame: frames.getIn(['list', activeFrameIndex]),
    paletteGridData: state.present.getIn(['palette', 'grid']),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    cellSize: state.present.get('cellSize'),
    duration: state.present.get('duration')
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledModal);
export default ModalContainer;

const CloseButton = styled(Button)`
  padding: 0.4em 0.7em 0.3em 0.8em;
`;
