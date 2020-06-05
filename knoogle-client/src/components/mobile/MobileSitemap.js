import React from "react";
import { Link } from "react-router-dom";

import {
    lightBulbSideBar,
    facebook,
    instagram,
    youtube,
    twitter,
    gitHub
} from "../../resources";

import styles from "../../styles/components/mobile/MobileSitemap.module.sass";

export default function MobileSitemap(props) {
    return (
        <div
            className={styles.MobileSitemapContainer}
            ref={props.mobileSitemapRef}
        >
            <img
                src={lightBulbSideBar}
                onClick={props.closeMobileSitemap}
                alt=""
            />
            <nav>
                <ul>
                    <li>
                        <Link className={styles.firstGroup} to="/">
                            Homepage
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.firstGroup} to="/about">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.firstGroup} to="/tutorial">
                            Tutorial
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.secondGroup} to="/feedback">
                            Feedback
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={styles.secondGroup}
                            to="/TermsDisclaimer"
                        >
                            Terms &amp; Disclaimer
                        </Link>
                    </li>
                </ul>
            </nav>
            <footer>
                <span> © 2019 Knowglet</span>
                <div className={styles.footerIcons}>
                    <a
                        href="https://www.facebook.com/knowglet"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img src={facebook} alt="Facebook page" />
                    </a>
                    <a
                        href="https://twitter.com/knowglet"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img src={twitter} alt="Twitter page" />
                    </a>
                    <a
                        href="https://github.com/jerryturcios08/knoogle-client"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img src={gitHub} alt="Github page" />
                    </a>
                    <a
                        href="https://www.instagram.com/knowglet/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img src={instagram} alt="Instagram page" />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UC5H6AMsQ4xZ9xuxe7BiP3Zg"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img src={youtube} alt="YouTube page" />
                    </a>
                </div>
                <span> knowglet@gmail.com</span>
            </footer>
        </div>
    );
}
