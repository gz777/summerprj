import React, { Component } from "react";

import Mobile from "../../components/mobile";
import { Header, Footer } from "../../components/common";

import { doodle } from "../../resources/index";

import styles from "../../styles/pages/AboutUs.module.sass";

export default class AboutUs extends Component {
    componentDidMount() {
        document.title = "Knowglet - About us";
    }

    componentWillUnmount() {
        document.title = "Knowglet";
    }

    render() {
        return (
            <div className={styles.AboutUsContainer}>
                <Mobile />
                <Header />
                <div className={styles.aboutUsBody}>
                    <div className={styles.aboutUsImg}>
                        <img src={doodle} className={styles.doodle} alt="" />
                    </div>
                    <div className={styles.aboutUsText}>
                        <div className={styles.ourMission}>
                            <h3>Our Mission</h3>
                            <p>
                                Our Mission is to give exactly what you searched
                                for.
                            </p>
                        </div>
                        <div className={styles.ourObjectives}>
                            <h3>Our Objectives</h3>
                            <p>
                                Our objectives are to provide you with no ads,
                                no fluff. Also, suggested results based on your
                                search and a new way to search which you'll be
                                able to visually display your train of thoughts
                                while researching - through ontologies.
                            </p>
                        </div>
                        <div className={styles.ourTeam}>
                            <h3>Our Team</h3>
                            <p>
                                We are a summer research team of four
                                undergraduate students and a project manager,
                                who wanted to make a difference in the way
                                people search the web.
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
