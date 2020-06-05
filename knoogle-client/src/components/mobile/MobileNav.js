import React from "react";
import { Link } from "react-router-dom";

import { aboutUsIcon, tutorial, threeDots } from "../../resources";

import styles from "../../styles/components/mobile/MobileNav.module.sass";

const MobileNav = props => (
    <header className={styles.mobileNav}>
        <nav>
            <ul>
                <li>
                    <i className="icon">
                        <Link to="/tutorial">
                            <img src={tutorial} alt="" />
                        </Link>
                    </i>
                </li>
                <li>
                    <i className="icon about">
                        <Link to="/about">
                            <img src={aboutUsIcon} alt="" />
                        </Link>
                    </i>
                </li>
                <li>
                    <i className="icon about">
                        <img
                            src={threeDots}
                            onClick={props.closeMobileSitemap}
                            alt=""
                        />
                    </i>
                </li>
            </ul>
        </nav>
    </header>
);

export default MobileNav;
