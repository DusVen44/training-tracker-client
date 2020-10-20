import React, { Component } from 'react';
import './ProgramRoutines.css'

export default class ProgramRoutines extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="program-routines-container">
                <h1 className="program-routines-header">
                        Dustin's Programs
                </h1>
            </div>
        )
    }
}
