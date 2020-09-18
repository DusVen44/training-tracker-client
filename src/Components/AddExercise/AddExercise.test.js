import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import AddExercise from './AddExercise';

describe('<AddExercise />', () => {
  it('RENDERS AddExcerise.js WITHOUT CRASHING', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><AddExercise /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})