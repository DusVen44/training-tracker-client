import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import config from '../../config';

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
        const filteredList = exercises.filter(i => {
            return (
                i.exercise_name.indexOf(exercise_name) !== -1
            )
        });
        return (
            <div className="add-exercise-container">
                <form className="add-exercise-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Exercise Name:</label>
                    <input
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
                    {filteredList.map(i => {
                        return <div key={i.id}>
                                {i.exercise_name}
                               </div>
                    })}
                </div>
            </div>
        )
    }
}
