import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import notebook from '../../images/notebook.png';
import open_notebook from '../../images/open-notebook.png';

export default function Landing() {
    return (
        <div className="landing-container">

            <div className="intro-text">
                <h2 className="intro-big">Welcome to Training Tracker</h2>
                <p className="intro-little">Sign up now to log your workouts, 
                                            track your progress, and crush your
                                            goals!</p>
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
