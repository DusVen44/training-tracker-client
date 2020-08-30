import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import notebook from '../../images/notebook.png';
import open_notebook from '../../images/open-notebook.png';

export default function Landing() {
    return (
        <div className="landing-container">

            <div className="intro-text">
                <h2>Welcome to Training Tracker</h2>
                <p>Sign up now to log your workouts and track your progress. Whether you're
                   setting deadlift records or improving your marathon time, Training Tracker
                   will help you crush your goals like never before!</p>
            </div>

            <div className="images-container">
                <img src={notebook} alt="notebook" className="notebook-image" />
                <img src={open_notebook} alt="open notebook" className="open-notebook" />
            </div>

            <div className="buttons">
                <Link to='/signup' className="link">Sign up</Link>
                <Link to='/login' className="link">Log In</Link>
            </div>

        </div>
    )
}
