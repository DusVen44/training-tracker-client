import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import ValidationError from '../ValidationError/ValidationError';
import config from '../../config';
import TokenService from '../../services/token-service';

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: {
                value: "",
                touched: false
            },
            email: {
                value: "",
                touched: false
            },
            password: {
                value: "",
                touched: false
            }
        }
    }

    updateUsername(username) {
        this.setState({
            username: {
                value: username,
                touched: true
            }
        })
    }

    validateUsername() {
        const username = this.state.username.value;
        if (username.length === 0) {
            return 'Username is required!'
        }
    }

    updateEmail(email) {
        this.setState({
            email: {
                value: email,
                touched: true
            }
        })
    }

    validateEmail() {
        const email = this.state.email.value;
        if (email.length === 0) {
            return 'Email is required for "Forgot Password Service"!'
        }
    }

    updatePassword(password) {
        this.setState({
            password: {
                value: password,
                touched: true
            }
        })
    }

    validatePassword() {
        const password = this.state.password.value;
        if (password.length === 0) {
            return 'Password is Required!'
        }
    }

    


    //Function to handle Signing Up/Registering
    handleSubmitSignup = e => {
        e.preventDefault();
                
        TokenService.saveUsername(this.state.username.value);
        TokenService.saveEmail(this.state.email.value);
        
        fetch(`${config.API_ENDPOINT}/api/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
              },
            body: JSON.stringify({
                username: this.state.username.value,
                email: this.state.email.value,
                password: this.state.password.value
            })
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
        .then((user) => {
            this.props.history.push('/login')
        })
        .catch(error => {
            alert('Error', error)
            console.log(error)
        });
    }

    render() {
        const { username, email, password } = this.state;
        return (
            <div className="signup-container">

                <div className="instructions">
                    <p>Fill in the form below and click the Sign Up button 
                       to create your notebook training log.
                    </p>
                </div>


                {/* Sign Up Form */}
                <form className="signup-form" onSubmit={this.handleSubmitSignup}>

                    <label className="label" htmlFor="username">Username:</label>
                    <input
                        className="input"
                        type="text"
                        name="username"
                        id="username"
                        onChange={e => this.updateUsername(e.target.value)}
                        required
                    />
                    {username.touched && <ValidationError message={this.validateUsername()} />}

                    <label className="label" htmlFor="email">Email Address:</label>
                    <input
                        className="input"
                        type="text"
                        name="email"
                        id="email"
                        onChange={e => this.updateEmail(e.target.value)}
                        required
                    />
                    {email.touched && <ValidationError message={this.validateEmail()} />}

                    <label className="label" htmlFor="password">Password:</label>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                        onChange={e => this.updatePassword(e.target.value)}
                        required
                    />
                    {password.touched && <ValidationError message={this.validatePassword()} />}

                    <div className="signup-form-buttons">
                        <button
                            type="submit"
                            className="signup-button"
                        >
                            Sign Up
                        </button>

                        <Link to='/' className="cancel-link">
                            <button
                                type="button"
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                        </Link>
                    </div>
                    

                </form>
            </div>
        )
    }
}
