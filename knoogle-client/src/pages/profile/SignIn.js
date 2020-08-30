/*
    File: src/pages/feedback/SignIn.js
    Written by : Diego Taveras & Jerry Turcios
*/

import React, { Component } from "react";
import { Link } from "react-router-dom";

import { navLogo } from "../../resources";

import style from "../../styles/components/SignIn.module.sass";

export default class SignIn extends Component {
    render() {
        return (
            <form className={style.SignInContainer}>
                <div className={style.logo}>
                    <Link to="/">
                        <img src={navLogo} alt="Nav logo" />
                    </Link>
                </div>
                <div className={style.title}>
                    <h2>Sign In</h2>
                    <p>With your Knoogle Account</p>
                </div>
                <div className={style.email}>
                    <input
                        type="email"
                        placeholder="Enter your email or phone"
                        required
                    />
                    <p>Forgot email?</p>
                </div>
                <div className={style.introText}>
                    <p>
                        Get a personalized search experience that saves you time
                        and money, just sign in to Knoogle
                    </p>
                    <Link to="/auth/register">
                        <p>No account? Create one!</p>
                    </Link>
                </div>
                <Link to="/password">
                    <button className={style.button} type="submit">
                        Next
                    </button>
                </Link>
            </form>
        );
    }
}
