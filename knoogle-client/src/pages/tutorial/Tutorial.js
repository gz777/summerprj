/*
    File: src/pages/tutorial/Tutorial.js
    Written by : Diego Taveras & Jerry Turcios
*/

import React, { Component } from "react";
import Mobile from "../../components/mobile";
import { Header, Footer } from "../../components/common";

import styles from "../../styles/pages/Tutorial.module.sass";

export default class Tutorial extends Component {
    componentDidMount() {
        document.title = "Knowglet - Tutorial";
    }

    componentWillMount() {
        document.title = "Knowglet";
    }

    render() {
        return (
            <div className={styles.AboutUsContainer}>
                <Mobile />
                <Header />
                <div className={styles.tutorialContainer}>
                    <h2>Under Construction...</h2>
                    {/* <div className={styles.tutorialTitle}>
                        <h2>How to Create Your</h2>
                        <h2> Own Ontology: </h2>
                    </div>
                    <div className={styles.videoContainer}>
                        <iframe
                            title="myframe"
                            src="https://www.youtube.com/embed/DvrkHAWj1Sk"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div> */}
                </div>
                <Footer />
            </div>
        );
    }
}
