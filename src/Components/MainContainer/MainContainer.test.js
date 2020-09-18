import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import MainContainer from './MainContainer';

describe('<MainContainer />', () => {
  it('RENDERS MainContainer.js WITHOUT CRASHING', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><MainContainer /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})