import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Signup from './Signup';

describe('<Signup />', () => {
  it('RENDERS Signup.js WITHOUT CRASHING', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Signup /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})