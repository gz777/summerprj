import React, { Component } from "react";
import { Link } from "react-router-dom";

import { registerUser } from "../../api/auth/registration";
import { navLogo } from "../../resources";

import style from "../../styles/pages/Register.module.sass";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
            this
        );
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(
            this
        );
        this.handlePasswordLengthValidity = this.handlePasswordLengthValidity.bind(
            this
        );
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            isPasswordConfirmed: false,
            isPasswordLongEnough: false
        };
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value,
            isPasswordConfirmed: false,
            isPasswordLongEnough: false
        });
    }

    handleConfirmPasswordChange(e) {
        this.setState({
            confirmPassword: e.target.value,
            isPasswordConfirmed: false
        });
    }

    handlePasswordConfirmation() {
        this.setState({
            isPasswordConfirmed: true
        });
    }

    handlePasswordLengthValidity() {
        this.setState({
            isPasswordLongEnough: true
        });
    }

    handleFormSubmission(e) {
        e.preventDefault();
        // TODO: The method below returns a promise. It returns either a key
        //  for verification purposes or an error. That needs to be handled.
        registerUser(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.confirmPassword,
            this.handlePasswordConfirmation,
            this.handlePasswordLengthValidity
        );
    }

    componentDidMount() {
        document.title = "Knowglet - Create an account";
    }

    componentWillUnmount() {
        document.title = "Knowglet";
    }

    render() {
        return (
            <div className={style.container}>
                <form
                    onSubmit={this.handleFormSubmission}
                    className={style.RegisterContainer}
                >
                    <div className={style.logo}>
                        <Link to="/">
                            <img src={navLogo} alt="Nav logo" />
                        </Link>
                    </div>
                    <div className={style.title}>
                        <h2>Create an Account</h2>
                        <p>with Knoogle</p>
                    </div>
                    <div className={style.email}>
                        <input
                            placeholder="Enter your email"
                            onChange={this.handleEmailChange}
                            type="email"
                            value={this.state.email}
                            required
                        />
                    </div>
                    <div className={style.email}>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            onChange={this.handleUsernameChange}
                            value={this.state.username}
                            required
                        />
                    </div>
                    {this.state.isPasswordLongEnough && (
                        <p>Password must have a minimum of 8 characters.</p>
                    )}
                    <div className={style.email}>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            onChange={this.handlePasswordChange}
                            value={this.state.password}
                            required
                        />
                    </div>
                    {this.state.isPasswordConfirmed && (
                        <p>Passwords are not the same</p>
                    )}
                    <div className={style.email}>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            onChange={this.handleConfirmPasswordChange}
                            value={this.state.confirmPassword}
                            required
                        />
                    </div>
                    <button className={style.button} type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
