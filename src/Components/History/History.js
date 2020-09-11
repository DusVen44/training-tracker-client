import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './History.css';
import config from '../../config';
import TokenService from '../../services/token-service';

export default class History extends Component {
    constructor() {
        super()
        this.state = {
            routineList: []
        }
    }

// LOAD THE HISTORY LIST
    componentDidMount() {
        const userId = Number(TokenService.getUserId());
        fetch(`${config.API_ENDPOINT}/api/history/${userId}`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
        .then(res => {
            this.setState({
                routineList: res
            })
        })
        .catch(error => {
            alert("Could not load history", error);
            console.log(error)
        })
    };

// DELETE ROUTINE
    handleDelete = (e, id) => {
        e.preventDefault();
        const user_id = Number(TokenService.getUserId());
        fetch(`${config.API_ENDPOINT}/api/history/${user_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({ user_id, id }),
        })
        .then(() => {
            this.props.history.push('/history')
        });
    };

//RENDER DELETE BUTTON
    renderDeleteButton = () => {
        return (
            <button
                className="delete-routine-button"
                onClick={this.handleDelete}
            >
                Delete Routine
            </button>
        )
    }

    render() {
        console.log(this.state.routineList)
        const list = this.state.routineList.map(i => {
            return (
                <div key={i.id}>
                    <Link 
                        to={`/new-workout/${i.id}`}
                        key={i.id}
                    >
                        <h3>{i.routine_title}</h3>
                    </Link>
                        <div>
                            <p>{i.route_date}</p>
                            <p>{i.routine_content}</p>
                            {this.renderDeleteButton()}
                        </div>
                </div>
            )
        });
        return (
            <div className="history-container">
                {list}
            </div>
        )
    }
}
