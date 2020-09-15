import React, { Component } from 'react';
import './Notebook.css';
import TokenService from '../../services/token-service';

export default class Notebook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: TokenService.getUserId(),
            username: TokenService.getUsername()
        }
    }

    render() {
        const { user_id, username } = this.state;
        return (
            <div className="notebook-container">
                               
                <h2 className="username-text">{username}'s Training Log</h2>

                <div className="notebook-links">
                    <a href="/new-workout/new"><h3 className="h3-link">Create New Routine</h3></a>

                    <a href={`/history/${user_id}`}><h3 className="h3-link">View Past Workouts</h3></a>
                </div>

            </div>
        )
    }
}
