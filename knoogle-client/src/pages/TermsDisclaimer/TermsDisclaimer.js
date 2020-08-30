/*
    File: src/pages/TermsDisclaimer/TermsDisclaimer.js
    Written by : Diego Taveras & Jerry Turcios
*/

import React, { Component } from "react";

import Mobile from "../../components/mobile";
import { Header, Footer } from "../../components/common";

import style from "../../styles/pages/TermsDisclaimer.module.sass";

export default class TermsDisclaimer extends Component {
    render() {
        return (
            <div className={style.TermsDisclaimerContainer}>
                <Mobile />
                <Header />
                <div className={style.termsDisclaimerBody}>
                    <div className={style.TermsDisclaimer}>
                        <h3>Terms of Use & Disclaimer</h3>
                        <p>
                            Everything on this site, unless otherwise stated, is
                            copyrighted by Knowglet.com
                        </p>
                        <p>
                            Knowglet.com welcomes the use of this site for
                            personal use, non-commercial use, research or study
                            - provided that the user acknowledges all copyright
                            and other notices contained in the content.
                        </p>
                        <p>
                            We are commited to protecting your privacy. We
                            recognize that your personal information is
                            confidential and the website does not collect any
                            pesonal information.
                        </p>
                        <p>
                            While the information and functionalities contained
                            within this website are periodically updated, no
                            guarantee is given that the information and
                            functionalities provided in this website are
                            error-free or complete.
                        </p>
                        <p>
                            We welcome people to join our open source
                            development and make the website better and more
                            useful
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
