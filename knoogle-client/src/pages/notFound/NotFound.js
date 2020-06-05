import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Footer, Header } from "../../components/common";
import Mobile from "../../components/mobile";

import styles from "../../styles/pages/NotFound.module.sass";

export default class NotFound extends Component {
    componentDidMount() {
        document.title = "Knowglet - 404 Not Found";
    }

    componentWillMount() {
        document.title = "Knowglet";
    }

    render() {
        return (
            <>
                <Mobile />
                <Header />
                <div className={styles.notFoundMessage}>
                    <h2>The page you are looking for can't be found.</h2>
                    <h1 className={styles.notFoundNumber}>404</h1>
                    <h3 className={styles.notFoundReturnLink}>
                        <Link to="/">Click here to go home</Link>
                    </h3>
                </div>
                <Footer />
            </>
        );
    }
}
