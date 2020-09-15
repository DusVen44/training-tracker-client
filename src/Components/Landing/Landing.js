import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import sampleRoutine from '../../images/sample-routine.png';
import exerciseList from '../../images/exercise-list.png';
import historySample from '../../images/history-sample.png';


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
                <p className="images-instructions">Choose from a list of exercises to populate your routine. Save your routine
                   and view your past workouts anytime you want.
                </p>
                <img src={exerciseList} alt="notebook" className="list-image" />
                <img src={sampleRoutine} alt="open notebook" className="routine-image" />
                <img src={historySample} alt="open notebook" className="history-image" />
            </div>

            <div className="buttons">
                <Link to='/signup' className="link">Sign up</Link>
                <Link to='/login' className="link">Log In</Link>
            </div>

        </div>
    )
}
