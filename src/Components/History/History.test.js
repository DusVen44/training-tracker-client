import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import History from './History';

describe('<History />', () => {
  it('RENDERS History.js WITHOUT CRASHING', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><History /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})