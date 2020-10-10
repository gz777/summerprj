/*
    File: src/pages/feedback/SignIn.js
    Written by : Diego Taveras & Jerry Turcios
*/

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebases from "../../firebase/firebase";
import { navLogo } from "../../resources";

import style from "../../styles/components/SignIn.module.sass";

const SignIn = () => {
    const [signIn, setSingIn] = useState({
        email: "",
        password: ""
    });
    const [response, setResponse] = useState(null);
    const history = useHistory();

    const handleChange = e => {
        setSingIn({
            ...signIn,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        await firebases
            .login(signIn.email, signIn.password)
            .then(() => {
                history.push("/");
            })
            .catch(error => {
                setResponse(error.message);
            });
    };

    return (
        <form className={style.SignInContainer} onSubmit={handleSubmit}>
            <div className={style.logo}>
                <Link to="/">
                    <img src={navLogo} alt="Nav logo" />
                </Link>
            </div>
            <div className={style.title}>
                <h2>Sign In</h2>
                <p>With your Knoogle Account</p>
            </div>
            <div className={style.introText}>
                <p>
                    Get a personalized search experience that saves you time and
                    money, just sign in to Knoogle
                </p>
                <Link to="/auth/register">
                    <p>No account? Create one!</p>
                </Link>
                {response && <p className={style.errorText}>{response}</p>}
            </div>
            <div className={style.email}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    onChange={handleChange}
                />
            </div>
            <div className={style.email}>
                <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <p>Forgot email?</p>
            <button className={style.button} type="submit">
                Next
            </button>
        </form>
    );
};

export default SignIn;
