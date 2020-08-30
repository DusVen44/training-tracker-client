import React, { Component } from 'react';
import './NewWorkout.css';
import Context from '../../Context';
import config from '../../config';
import Calendar from '../Calendar/Calendar';

export default class NewWorkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: [{"exercise_name":"Barbell Shrug"}],
            date: new Date(),
            showCalendar: false,
            title: "",
            showExerciseList: false,
            searchValue: ""
        }
    }

    static contextType = Context;

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

    toggleCalendar = () => {
        this.setState({
            showCalendar: !this.state.showCalendar
        })
    };

    onDateChange = date => {
        this.setState({ 
            date: date 
        })
        this.toggleCalendar()
    };

    updateTitle(title) {
        this.setState({
            title: title
        })
    };

    updateSearchValue(searchTerm) {
        this.setState({
            searchValue: searchTerm
        })
    };

    toggleExerciseList = () => {
        this.setState({
            showExerciseList: !this.state.showExerciseList
        })
    };

    render() {
        const exercises = this.state.exercises;
        const date = this.state.date;
        const searchValue = this.state.searchValue.toLowerCase();
        const filteredList = exercises.filter(i => {
            return i.exercise_name.toLowerCase().indexOf(searchValue) !== -1
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
            addExerciseButtonText = "Cancel Add"
        }
    
        return (
            <div className="new-workout-container">

                {/* DATE */}
                <h3 className="date">Date: {date.toDateString()}</h3>
                <button
                    className="change-date-button"
                    onClick={this.toggleCalendar}
                >
                    {dateButtonText}
                </button>
                <div className="calendar-popup">
                    {this.state.showCalendar && <Calendar 
                                                    onChange={this.onDateChange}
                                                    value={this.state.date}
                                                    onClickDay={this.toggleCalendar}
                                                />}
                </div>

                {/* Workout Form */}
                <form className="new-workout-form">

                    <label htmlFor="title">Workout Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={e => this.updateTitle(e.target.value)}
                        required
                    />
                    <br />




                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="end-and-save-button"
                    >
                        End and Save
                    </button>

                </form>

            {/* Add Exercise Button */}
            <button
                className="add-exercise-button"
                onClick={this.toggleExerciseList}
            >
                {addExerciseButtonText}
            </button>

            <div>

                {/* Search Input */}
                {this.state.showExerciseList &&
                <h3>Search:
                    <input
                        type="text"
                        onChange={e => this.updateSearchValue(e.target.value)}
                        value={searchValue}
                    />
                </h3>
                }

                {/* List of Exercises - Filter with Search Input Value */}
                <ul className="exercise-list">                
                    {this.state.showExerciseList &&
                        filteredList.map(i => {
                                    return (
                                        <li 
                                            className="exercise-button"
                                            key={i.id}
                                        >
                                            {i.exercise_name}                                
                                        </li>
                                    )
                            })}
                </ul>
            </div>


            </div>
        )
    }
}
