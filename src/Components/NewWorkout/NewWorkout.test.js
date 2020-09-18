import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import NewWorkout from './NewWorkout';

describe('<NewWorkout />', () => {
  it('RENDERS NewWorkout.js WITHOUT CRASHING', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NewWorkout /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})