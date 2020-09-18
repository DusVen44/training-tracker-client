import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import config from '../../config';
import './AddExercise.css';

export default class AddExercise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: TokenService.getUserId(),
            exercise_name: '',
            exercises: []
        }
    }

    // LOAD THE LIST OF EXERCISES FROM SERVER
    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/api/exercises`)
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )
        .then((res) => {
            this.setState({
                exercises: res
            })
        })
        .catch(error => {
            alert("Could not load exercises", error);
            console.log(error)
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const exercise_name = this.state.exercise_name;
        
        fetch(`${config.API_ENDPOINT}/api/exercises`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
              },
            body: JSON.stringify({
                exercise_name: exercise_name
            })
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
        .then(this.setState({
            exercise_name: ''
        }))
        .then(() => {
            window.location.reload()
        })
        .catch(error => {
            alert('Error', error)
            console.log(error)
        });
    }

    updateName(name) {
        this.setState({
            exercise_name: name
        })
    }

    render() {
        const { exercises, exercise_name } = this.state;
        const list = exercises.map(i => {
            return i.exercise_name
        })
        const sortedList = list.sort()
        const filteredList = sortedList.filter(i => {
            return (
                i.indexOf(exercise_name) !== -1
            )
        });
        return (
            <div className="add-exercise-container">
                <form className="add-exercise-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="name" className="input-name">Exercise Name:</label>
                    <input
                        className="new-exercise-input"
                        type="text"
                        id="name"
                        value={exercise_name}
                        onChange={e => this.updateName(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="submit-exercise-button"
                    >
                        Submit
                    </button>
                </form>

                <div className="exercise-list">
                    {filteredList.map((i, index) => {
                        return <div key={index} className="each-exercise">
                                {i}
                               </div>
                    })}
                </div>
            </div>
        )
    }
}
