import React, { Component } from 'react';
import './SetInput.css';

export default class SetInput extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            lbs: 0,
            reps: 0
        }
    }

    // updateLbs = (lbs) => {
    //     this.setState({
    //         lbs: lbs
    //     })
    // }

    updateReps = (reps) => {
        this.setState({
            reps: reps
        })
    }

    render() {
        return (
            <div className="inputs">

                <div className="set-count">
                    {this.props.setCount}
                </div>

                <input
                    type="number"
                    min={1}
                    step={1}
                    id="lbs"
                    name="lbs"
                    value={this.props.lbs}
                    onChange={e => this.props.updateLbs(e.target.value)}
                />

                <input
                    type="number"
                    min={0}
                    step={1}
                    id="reps"
                    name="reps"
                    value={this.props.reps}
                    onChange={e => this.updateReps(e.target.value)}
                />

            </div>
        )
    }
}
