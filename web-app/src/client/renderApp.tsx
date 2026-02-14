import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from '../common/router';
import ReduxStateDecorator from './redux/StateDecorator';

export default function RenderApp() {
  const supportsHistory = 'pushState' in window.history;
  const RootElement = document.getElementById('root') as HTMLElement;

  let preloadedState;
  if (typeof window !== 'undefined') {
    // @ts-ignore
    preloadedState = window.__PRELOADED_STATE__ || {};
    const stateData = document.getElementById('stateData') as HTMLElement;
    if (stateData) document.head.removeChild(stateData);
    // @ts-ignore
    // eslint-disable-next-line react-hooks/immutability
    delete window.__PRELOADED_STATE__;
  }

  ReactDOM.hydrate(
    <BrowserRouter forceRefresh={!supportsHistory}>
      <ReduxStateDecorator initialState={preloadedState}>
        <Router />
      </ReduxStateDecorator>
    </BrowserRouter>,
    RootElement
  );
}
