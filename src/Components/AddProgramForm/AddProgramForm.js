import React, { Component } from 'react';
import "./AddProgramForm.css";
import ValidationError from '../ValidationError/ValidationError';
import TokenService from '../../services/token-service';
import config from '../../config';

export default class AddProgramForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            programName: "",
            user_id: TokenService.getUserId(),
            touched: false
        };
    }

//ADD NEW PROGRAM FOLDER
    handleSubmit = e => {
        e.preventDefault();

        const userId = this.state.user_id;
        fetch(`${config.API_ENDPOINT}/api/programfolders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}` 
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                program_name: this.state.programName
            })
        })
        .then(res => 
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
        .then(() => {
            window.location.reload()
        })
        .catch(error => {
            alert('Error', error)
            console.log(error)
        });
    }

    updateProgramName(name) {
        this.setState({
            programName: name,
            touched: true
        })
    }

    validateProgramName() {
        const name = this.state.programName;
        if (name.length === 0) {
            return 'Program Name is required!';
        }
    }


    render() {
        console.log(this.props.reloadPage)
        return (
            <form className="add-program-form" onSubmit={this.handleSubmit}>
            <label htmlFor="programName" className="label-program-name">Program Name:</label>
            <input 
                type="text"
                name="programName"
                id="programName"
                onChange={e => this.updateProgramName(e.target.value)}
                required
            />
            {this.state.touched && <ValidationError message={this.validateProgramName()}/>}
            <button 
                type="submit"
                className="submit-button"
                disabled={!this.state.programName}
            >
                Add Program!
            </button>
        </form>
        )
    }
}
