import React, { Component } from 'react';
import './ExerciseContainer.css';
import SetInput from '../SetInput/SetInput';
import Context from '../../Context';

export default class ExerciseContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonClick: 0,
            setCount: [1],
        }}

    static contextType = Context;

    // ADD NEW SET
    addSet = () => {
        this.setState({
            buttonClick: this.state.buttonClick + 1,
            setCount: [...this.state.setCount, this.state.setCount.push(this.state.setCount + 1)]
        })
    }

    //DELETE LAST SET
    deleteSet = () => {
        this.state.setCount.pop()
        this.setState({
            buttonClick: this.state.buttonClick - 1,
        })
    }

    //UPDATE NOTES
    updateExerciseNotes(note) {
        this.setState({
            notes: note
        })
    }

    render() {
        return (
            <div className="chosen-exercise-container">

                {/* EXERCISE NAME AND NOTES */}
                    <div className="exercise-name-box">
                        <div className="exercise-name">
                            {this.props.name}
                        </div>
                    </div>

                {/* SETS AND BUTTONS */}
                    <div className="set-and-button-box">
                        <div className="input-box">
                            <div className="input-labels">
                                <label className="set" htmlFor="set">Set</label>
                                <label className="lbs" htmlFor="lbs">lbs</label>
                                <label className="reps" htmlFor="reps">Reps</label>
                            </div>

                            <div>
                                {this.state.setCount.map(i => {
                                    return <SetInput 
                                            key={i}
                                            name={this.props.name}
                                            type={this.props.type}  
                                            setCount={this.props.setCount}
                                            lbs={this.props.lbs}
                                            reps={this.props.reps}
                                            addedLbs={this.props.addedLbs}
                                            time={this.props.time}
                                            exerciseName={this.props.name}
                                            updateLbs={this.props.updateLbs}/>
                                })}
                            </div>
                        </div>

                    {/* BUTTONS */}
                        <div className="buttons-div">
                            <button 
                                type="button" 
                                className="add-set-button" 
                                onClick={e => this.addSet(e.target.value)}
                            >
                                Add Set
                            </button>
                            <button 
                                type="button" 
                                className="delete-set-button" 
                                onClick={e => this.deleteSet(e.target.value)}
                                disabled={this.state.buttonClick === 0}
                            >
                                Delete Last Set
                            </button>
                            <button 
                                type="button" 
                                className="delete-exercise-button" 
                                onClick={e => this.props.deleteExercise(this.props.name)}
                            >
                                Delete Exercise
                            </button>
                        </div>
                    </div>

            </div>
        )
    }
}
