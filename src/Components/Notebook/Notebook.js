import React, { Component } from 'react';
import './Notebook.css';

export default class Notebook extends Component {
    render() {
        return (
            <div className="notebook-container">

                <h2>Dustin's Training Tracker</h2>

                <a href="/new-workout/new"><h3>Create New Workout</h3></a>

                <a href="/history"><h3>View Past Workouts</h3></a>

            </div>
        )
    }
}
