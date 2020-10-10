/*
    File: src/components/common/Header.js
    Written by : Diego Taveras & Jerry Turcios
*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FirebaseContext from "../../firebase/context";
import { aboutUsIcon, navLogo, profileIcon, tutorial } from "../../resources";
import firebases from "../../firebase/firebase";

import styles from "../../styles/components/common/Header.module.sass";

function Header() {
    const { user } = useContext(FirebaseContext);

    const handleSignOut = async e => {
        await firebases.logout();
    };

    return (
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
                            <img
                                src={navLogo}
                                className={styles.mainLogo}
                                alt=""
                            />
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
                    {user ? (
                        <li onClick={handleSignOut}>
                            <i className={styles.icon}>
                                <img src={profileIcon} alt="" />
                            </i>
                            <Link to="#">Sign out</Link>
                        </li>
                    ) : (
                        <li>
                            <i className={styles.icon}>
                                <img src={profileIcon} alt="" />
                            </i>
                            <Link to="/profile">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
