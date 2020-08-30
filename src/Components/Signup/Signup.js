import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import Context from '../../Context';
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

    static contextType = Context;

    updateUsername(username) {
        this.setState({
            username: {
                value: username,
                touched: true
            }
        })
    }

    //Add validateUsername()

    updateEmail(email) {
        this.setState({
            email: {
                value: email,
                touched: true
            }
        })
    }

    //Add validateEmail()

    updatePassword(password) {
        this.setState({
            password: {
                value: password,
                touched: true
            }
        })
    }

    //Add validatePassword()


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
        return (
            <div className="signup-container">

                <div className="instructions">
                    <p>Fill in the form below to create your notebook and begin tracking 
                       your training.
                    </p>
                </div>


                {/* Sign Up Form */}
                <form className="signup-form" onSubmit={this.handleSubmitSignup}>

                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={e => this.updateUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={e => this.updateEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={e => this.updatePassword(e.target.value)}
                        required
                    />

                    <Link to='/'>
                        <button
                            type="button"
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                    </Link>

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Sign Up
                    </button>
                    

                </form>
            </div>
        )
    }
}
