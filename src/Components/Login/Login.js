import React, { Component } from 'react';
import './Login.css';
import config from '../../config';
import TokenService from '../../services/token-service';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: {
                value: "",
                touched: false
            },
            password: {
                value: "",
                touched: false
            }
        };
    };

    updateUsername(username) {
        this.setState({
            username: {
                value: username,
                touched: true
            }
        });
    };

    updatePassword(password) {
        this.setState({
            password: {
                value: password,
                touched: true
            }
        });
    };

    //Function to handle Logging In
    handleSubmitLogin = e => {
        e.preventDefault();

        TokenService.saveUsername(this.state.username.value);
        fetch(`${config.API_ENDPOINT}/api/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
              },
            body: JSON.stringify({
                username: this.state.username.value,
                password: this.state.password.value
            })
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
        .then((res) => {
            TokenService.saveAuthToken(res.authToken);
            TokenService.saveUserId(res.user_id);
            this.props.history.push(`/notebook`)
        })
        .catch(error => {
            alert('Error', error)
            console.log(error)
        });
    };

    render() {
        return (
            <div className="login-container">

                <div className="instructions">
                    <p>Fill in the form below to log in to your account.</p> 
                    <p>Use these credentials to test the application...</p> 
                    <p>Username:  TestTest1</p> 
                    <p>Password:  TestTest2020</p>
                </div>

            {/* Login Form */}
                <form className="login-form" onSubmit={this.handleSubmitLogin}>

                    <label className="label" htmlFor="email">Username:</label>
                    <input
                        className="input"
                        type="text"
                        name="username"
                        id="username"
                        onChange={e => this.updateUsername(e.target.value)}
                        required
                    />

                    <label className="label" htmlFor="password">Password:</label>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        id="password"
                        onChange={e => this.updatePassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="login-submit-button"
                    >
                        Log In
                    </button>

                </form>
            </div>
        )
    }
}
