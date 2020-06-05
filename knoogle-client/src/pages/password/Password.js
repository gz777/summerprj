import React, { Component } from "react";
import { Link } from "react-router-dom";

import { navLogo } from "../../resources";

import style from "../../styles/components/Password.module.sass";

export default class Password extends Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.PasswordContainer}>
                    <div className={style.logo}>
                        <Link to="/">
                            <img src={navLogo} alt="Nav logo" />
                        </Link>
                    </div>
                    <div className={style.title}>
                        <h2>Welcome</h2>
                        <p>[Their email]</p>
                    </div>
                    <div className={style.email}>
                        <input
                            type="text"
                            placeholder="Enter your password"
                            required
                        />
                        <p>Forgot password?</p>
                    </div>
                    <div className={style.checkbox}>
                        <input id="checkbox" type="checkbox" />
                        <label htmlFor="checkbox">Keep me signed in</label>
                    </div>
                    <div className={style.button}>Next</div>
                </div>
            </div>
        );
    }
}
