import React, { Component } from "react";

import SignIn from "./SignIn";

import styles from "../../styles/pages/Profile.module.sass";

export default class Profile extends Component {
    render() {
        return (
            <div className={styles.profileContainer}>
                <SignIn />
            </div>
        );
    }
}
