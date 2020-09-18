import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';

describe('<Calendar />', () => {
  it('RENDERS Calendar.js WITHOUT CRASHING', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Calendar /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})