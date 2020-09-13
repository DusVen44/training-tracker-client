import React, { Component } from 'react';
import './NewWorkout.css';
import config from '../../config';
import Calendar from '../Calendar/Calendar';
import TokenService from '../../services/token-service';

export default class NewWorkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: TokenService.getUserId(),
            exercises: [],
            date: new Date(),
            showCalendar: false,
            title: "",
            showExerciseList: false,
            searchValue: "",
            chosenExercises: [],
            input: []
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

// SUBMIT and POST ROUTINE
    handleSubmit = e => {
        e.preventDefault();
        const exercises = this.state.chosenExercises.map(i => {
            return i.exercise_name;
        })

        fetch(`${config.API_ENDPOINT}/api/history`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
              },
            body: JSON.stringify({
                user_id: this.state.user_id,
                routine_date: this.state.date.toDateString(),
                routine_title: this.state.title,
                routine_exercises: exercises,
                routine_input: this.state.input
            })
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
        .then((user) => {
            this.props.history.push('/history/:user_id')
        })
        .catch(error => {
            alert('Error', error)
            console.log(error)
        });
    }

//TOGGLE VIEW OF CALENDAR FOR DATE CHANGE
    toggleCalendar = () => {
        this.setState({
            showCalendar: !this.state.showCalendar
        })
    };

//CHANGE DATE
    onDateChange = date => {
        this.setState({ 
            date: date 
        })
        this.toggleCalendar()
    };

//UPDATE TITLE OF WORKOUT
    updateTitle(title) {
        this.setState({
            title: title
        })
    };

//UDPATE VALUE OF EXERCISE SEARCH
    updateSearchValue(searchTerm) {
        this.setState({
            searchValue: searchTerm
        })
    };

//TOGGLE VIEW OF EXERCISE LIST
    toggleExerciseList = () => {
        this.setState({
            showExerciseList: !this.state.showExerciseList,
            searchValue: ""
        })
    };

//ADD EXERCISE TO WORKOUT ROUTINE
    addExercise = (exercise) => {
        this.setState({
            chosenExercises: [...this.state.chosenExercises, exercise]
        })
    };

//ADD INPUT
    updateInput(index, e) {
        const { input } = this.state;
        input.splice(index, 1, e.target.value)
        this.setState({
            input: [...input]
        })
    }

//DELETE EXERCISE - PASSED DOWN TO EACH EXERCISE CONTAINER COMPONENT
    deleteExercise = name => {
        this.setState({
            chosenExercises: this.state.chosenExercises.filter(exercise => {
                return exercise.exercise_name !== name
            })
        })
    };


    render() {
        const { exercises, date, chosenExercises, input } = this.state;
        const searchValue = this.state.searchValue.toLowerCase();
    // CREATE FILTERED LIST FOR SEARCH BAR
        const filteredList = exercises.filter(i => {
            return (
                i.exercise_name.toLowerCase().indexOf(searchValue) !== -1
            )
        });

        let dateButtonText
        if (this.state.showCalendar === false) {
            dateButtonText = "Change Date"
        } else {
            dateButtonText = "Cancel Date Change"
        };

        let addExerciseButtonText
        if (this.state.showExerciseList === false) {
            addExerciseButtonText = "Add Exercise"
        } else {
            addExerciseButtonText = "Close Exercise List"
        }
    
        return (
            <div className="new-workout-container">

            {/* DATE */}
                <div className="date-container">
                    <div>
                        <h3 className="date">{date.toDateString()}</h3>
                    </div>

                    <div>
                        <button
                            className="change-date-button"
                            onClick={this.toggleCalendar}
                        >
                            {dateButtonText}
                        </button>
                    </div>

                    <div className="calendar-popup">
                        {this.state.showCalendar && <Calendar 
                                                        onChange={this.onDateChange}
                                                        value={this.state.date}
                                                        onClickDay={this.toggleCalendar}
                                                    />}
                    </div>
                </div>

            {/* WORKOUT FORM */}
                <form className="new-workout-form" onSubmit={this.handleSubmit}>

                {/* TITLE */}
                    <div className="title-box">
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={e => this.updateTitle(e.target.value)}
                            required
                            placeholder="Leg Day"
                        />
                        <br />
                    </div>

                {/* LOOP TO CREATE EACH EXERCISE BOX */}
                    <div>
                        {chosenExercises.map((i, index) => {
                            return (
                                <div className="chosen-exercise-container" key={index}>

                                {/* EXERCISE NAME  */}
                                    <div className="exercise-name-box">
                                        <div className="exercise-name">
                                            {i.exercise_name}
                                        </div>
                                    </div>

                                {/* INPUT BOX */}
                                    <div className="input-box">
                                        <label htmlFor={index}>Routine:</label>
                                        <textarea
                                            name="input"
                                            id={index}
                                            value={input[index]}
                                            onChange={e => this.updateInput(index, e)}
                                            required
                                        />
                                    </div>

                            </div>
                            )
                        })}
                    </div>

                {/* SUBMIT BUTTON */}
                    <div className="submit-button-container">
                        <button
                            type="submit"
                            className="end-and-save-button"
                        >
                            End and Save
                        </button>
                    </div>

                </form>

        {/* ADD EXERCISE BUTTON */}
            <div className="add-exercise-button-container">
                <button
                    className="add-exercise-button"
                    onClick={this.toggleExerciseList}
                >
                    {addExerciseButtonText}
                </button>
            </div>

            <div>

            {/* SEARCH INPUT */}
                {this.state.showExerciseList &&
                <div className="search-bar-container">
                    <h3>Search:
                        <input
                            type="text"
                            id="search"
                            onChange={e => this.updateSearchValue(e.target.value)}
                            value={searchValue}
                        />
                    </h3>
                </div>
                }

            {/* LIST OF EXERCISES - FILTER WITH SEARCH INPUT VALUE */}
                <div className="exercise-list">                
                    {this.state.showExerciseList &&
                        filteredList.map((i, index) => {
                                    return (
                                        <button 
                                            className="exercise-button"
                                            key={index}
                                            value={i.exercise_name}
                                            onClick={() => this.addExercise(i)}
                                        >
                                            {i.exercise_name}                                
                                        </button>
                                    )
                            })}
                </div>
            </div>


            </div>
        )
    }
}
