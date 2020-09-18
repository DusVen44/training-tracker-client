import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Notebook from './Notebook';

describe('<Notebook />', () => {
  it('RENDERS Notebook.js WITHOUT CRASHING', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Notebook /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})