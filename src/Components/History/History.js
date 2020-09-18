import React, { Component } from 'react';
import './History.css';
import config from '../../config';
import TokenService from '../../services/token-service';

export default class History extends Component {
    constructor() {
        super()
        this.state = {
            user_id: TokenService.getUserId(),
            routineList: [],
            routine_exercises: [],
            routine_input: []
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
                routineList: res,
                routine_exercises: res.map(i => {return i.routine_exercises}),
                routine_input: res.map(j => {return j.routine_input})
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
        const user_id = this.state.user_id;
        fetch(`${config.API_ENDPOINT}/api/history/${user_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({ user_id, id }),
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
        })
        .then(() => {
            window.location.reload()
        })
        .catch(error => {
            alert('Error', error)
            console.log(error)
        });
    };

    render() {
        const { routineList, routine_exercises, routine_input } = this.state;
        const splitList = routine_exercises.map(i=>{return i.split(",")});
        const splitInput = routine_input.map(i=>{return i.split(",")})
        const list = routineList.map((i, index) => {
            const date = new Date(i.routine_date).toDateString();
            const mappedInput = splitInput[index].map((input, index) => {
                                    return (
                                        <div key={index}>
                                            <div>{input}</div>
                                        </div>
                                    )
            })
            const mappedExercises = splitList[index].map((name, index) => {
                                        return (
                                            <div className="exercise-box" key={index}>
                                                <div className="ex-name">{index + 1} - {name}</div>
                                                <div className="ex-input">{mappedInput[index]}</div>
                                            </div>
                                        )
            })
            return (
                <div key={i.id} className="routine-box">
                    <h3 className="date-and-title">
                        <div>{date}</div>
                        {i.routine_title}</h3>
                        <div>
                            <div className="routine-exercises">{mappedExercises}</div>
                            <button
                                className="delete-routine-button"
                                onClick={e => this.handleDelete(e, i.id)}
                            >
                                Delete Routine
                            </button>
                        </div>
                </div>
            )
        });
        return (
            <div className="history-container">
                <h1 className="history-title">HISTORY</h1>

                <div className="list">
                    {list}
                </div>
            </div>
        )
    }
}
