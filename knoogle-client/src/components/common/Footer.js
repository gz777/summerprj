/*
    File: src/components/common/Footer.js
    Written by : Diego Taveras & Jerry Turcios
*/
import React from "react";
import { Link } from "react-router-dom";

import {
    navLogo,
    facebook,
    instagram,
    youtube,
    twitter,
    gitHub
} from "../../resources";

import style from "../../styles/components/common/Footer.module.sass";

const Footer = () => (
    <div className={style.footerBody}>
        <div className={style.siteMap}>
            <div className={style.grayLine} />
            <div className={style.grayLine} />
            <div className={style.siteMapLogo}>
                <Link to="/">
                    <img src={navLogo} alt="Knoogle's Main logo" />
                </Link>
            </div>
            <div className={style.siteMapLinks}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Homepage</Link>
                        </li>
                        <li>
                            <Link to="/tutorial">Tutorial</Link>
                        </li>
                        <li>
                            <a
                                href="https://www.buymeacoffee.com/czOaw7yP6"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Donations
                            </a>
                        </li>
                        <li>
                            <Link to="/about">About us</Link>
                        </li>
                        <li>
                            <Link to="/feedback">Feedback</Link>
                        </li>
                        <li>
                            <Link to="/TermsDisclaimer">
                                Terms & Disclaimer
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={style.grayLine} />
            <div className={style.footerSocial}>
                <span> © 2019 Knowglet</span>
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
                <span> knowglet@gmail.com</span>
            </div>
        </div>
    </div>
);

export default Footer;
