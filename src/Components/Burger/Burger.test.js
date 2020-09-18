import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Burger from './Burger';

describe('<Burger />', () => {
  it('RENDERS Burger.js WITHOUT CRASHING', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Burger /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})