import React, { Component } from "react";

import { Header, Footer } from "../../components/common";
import Mobile from "../../components/mobile";
import FirstSection from "./FirstSection";
import SearchSection from "./SearchSection";
import {
    laptopLightBulbOn,
    laptopLightBulbOff,
    wholeLaptopLightBulbOn,
    wholeLaptopLightBulbOff
} from "../../resources";

import styles from "../../styles/pages/Homepage.module.sass";

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.scrollToSearchSection = this.scrollToSearchSection.bind(this);
        this.jumpToSearchRef = React.createRef();
        this.state = {
            isLightOn: false,
            lightOnTimer: null,
            lightOffTimer: null,
            windowWidth: 0
        };
    }

    updateWindowDimensions() {
        this.setState({
            windowWidth: window.innerWidth
        });
    }

    scrollToSearchSection() {
        window.scrollTo(0, this.jumpToSearchRef.current.offsetTop);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        const lightOn = () => {
            this.setState({
                isLightOn: true
            });
        };

        const lightOff = () => {
            this.setState({
                isLightOn: false
            });
        };

        this.setState({
            lightOnTimer: setTimeout(lightOn, 2000),
            lightOffTimer: setTimeout(lightOff, 3000)
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);

        clearTimeout(this.state.lightOnTimer);
        clearTimeout(this.state.lightOffTimer);
    }

    render() {
        let laptopBulbImage;

        const lightBulbOnStyle = {
            display: this.state.isLightOn ? "block" : "none"
        };

        const lightBulbOffStyle = {
            display: this.state.isLightOn ? "none" : "block"
        };

        if (this.state.windowWidth >= 1199) {
            laptopBulbImage = (
                <>
                    <div className={styles.laptopContainer}>
                        <img
                            className={styles.laptop}
                            src={laptopLightBulbOn}
                            style={lightBulbOnStyle}
                            alt="A light bulb flashing logo"
                        />
                    </div>
                    <div className={styles.laptopContainer}>
                        <img
                            className={styles.laptop}
                            src={laptopLightBulbOff}
                            style={lightBulbOffStyle}
                            alt="A light bulb shuts off"
                        />
                    </div>
                </>
            );
        } else {
            laptopBulbImage = (
                <>
                    <div className={styles.laptopContainer}>
                        <img
                            className={styles.laptop}
                            src={wholeLaptopLightBulbOn}
                            style={lightBulbOnStyle}
                            alt="A light bulb flashing logo"
                        />
                    </div>
                    <div className={styles.laptopContainer}>
                        <img
                            className={styles.laptop}
                            src={wholeLaptopLightBulbOff}
                            style={lightBulbOffStyle}
                            alt="A light bulb shuts off"
                        />
                    </div>
                </>
            );
        }

        return (
            <div className={styles.homepageContainer}>
                <Mobile />
                <div className={styles.banner}>{laptopBulbImage}</div>
                <Header />
                <FirstSection
                    scrollToSearchSection={this.scrollToSearchSection}
                />
                <SearchSection
                    searchTerm={this.props.searchTerm}
                    jsonTree={this.props.jsonTree}
                    handleJsonTree={this.props.handleJsonTree}
                    handleTermChange={this.props.handleTermChange}
                    jumpToSearchRef={this.jumpToSearchRef}
                />
                <Footer />
            </div>
        );
    }
}
