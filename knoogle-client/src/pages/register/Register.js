/*
    File: src/pages/register/Register.js
    Written by : Diego Taveras & Jerry Turcios
*/

import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import firebases from "../../firebase/firebase";
import { navLogo } from "../../resources";

import style from "../../styles/pages/Register.module.sass";
import FirebaseContext from "./../../firebase/context";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [passwordMatch, setPasswordMatch] = useState(null);
    const [response, setResponse] = useState(null);
    const history = useHistory();

    const { firebase } = useContext(FirebaseContext);

    const handelChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handelSubmit = async e => {
        const { password, confirmPassword } = user;

        e.preventDefault();

        if (password === confirmPassword) {
            setPasswordMatch(false);
            await firebase.db
                .collection("users")
                .doc(user.email)
                .set({ user: user.email });
            await firebases
                .signUp(user.email, user.password)
                .then(() => {
                    history.push("/");
                })
                .catch(error => {
                    setResponse(error.message);
                });
        } else {
            setPasswordMatch(true);
        }
    };

    return (
        <div className={style.container}>
            <form onSubmit={handelSubmit} className={style.RegisterContainer}>
                <div className={style.logo}>
                    <Link to="/">
                        <img src={navLogo} alt="Nav logo" />
                    </Link>
                </div>
                <div className={style.title}>
                    <h2>Create an Account</h2>
                    <p>with Knoogle</p>
                </div>
                {response && <p className={style.errorText}>{response}</p>}
                <div className={style.email}>
                    <input
                        placeholder="Name"
                        name="name"
                        type="text"
                        required
                        onChange={handelChange}
                    />
                </div>
                <div className={style.email}>
                    <input
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        required
                        onChange={handelChange}
                    />
                </div>
                {passwordMatch && (
                    <div className={style.errorText}>passwords don't match</div>
                )}
                <div className={style.email}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        onChange={handelChange}
                    />
                </div>
                <div className={style.email}>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        required
                        onChange={handelChange}
                    />
                </div>
                <button className={style.button} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};
export default Register;
