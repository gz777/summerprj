/*
    File: src/components/common/Header.js
    Written by : Diego Taveras & Jerry Turcios
*/
import React from "react";
import { Link } from "react-router-dom";

import { aboutUsIcon, navLogo, tutorial } from "../../resources";

import styles from "../../styles/components/common/Header.module.sass";

const Header = () => (
    <header>
        <div className={styles.logo}>
            <Link to="/">
                <img src={navLogo} alt="Nav logo" />
            </Link>
        </div>
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        <img src={navLogo} className={styles.mainLogo} alt="" />
                    </Link>
                </li>
                <li>
                    <i className={styles.icon}>
                        <img src={tutorial} alt="" />
                    </i>
                    <Link to="/tutorial">Tutorial</Link>
                </li>
                <li>
                    <i className={styles.icon}>
                        <img src={aboutUsIcon} alt="" />
                    </i>
                    <Link to="/about">About us</Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;
