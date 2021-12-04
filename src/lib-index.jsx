import React, { useState, useEffect } from 'react';
import './css/imports.css'; // Import PostCSS files
import configureStore from './store/configureStore';
import { EthContextProvider } from './contexts/ethContext';
import Root from './components/Root';
import * as actionTypes from './store/actions/actionTypes';

export default function PixelArt({ showFrameControls, mintFn, frameConfig }) {
  const [showEditor, setShowEditor] = useState(false);
  useEffect(() => {
    setShowEditor(true);
  }, []);

  if (!showEditor) {
    return <div>Loading...</div>;
  }
  return (
    <PixelArtApp
      mintFn={mintFn}
      showFrameControls={showFrameControls}
      frameConfig={frameConfig}
    />
  );
}

// In case this code is pre-rendered by a server, it's simpler for us to have a
// component that only gets rendered in the browser. Then we don't need to
// worry about if all of the code is Node.js compatible because it can be gated
// behind `useEffect`.
function PixelArtApp({ showFrameControls, mintFn, frameConfig }) {
  const devMode = process.env.NODE_ENV === 'development';
  const store = configureStore({ devMode });

  useEffect(() => {
    if (frameConfig) {
      const fControls =
        showFrameControls === undefined ? true : showFrameControls;
      const frameInitAction = {
        type: actionTypes.NEW_PROJECT,
        options: {
          columns: frameConfig.columns,
          rows: frameConfig.rows,
          showFrameControls: fControls
        }
      };
      store.dispatch(frameInitAction);
    }
  }, [frameConfig, showFrameControls]);

  return (
    <EthContextProvider mintFn={mintFn}>
      <Root store={store} />
    </EthContextProvider>
  );
}
