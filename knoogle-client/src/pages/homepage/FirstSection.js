import React from "react";

import styles from "../../styles/components/FirstSection.module.sass";

const FirstSection = props => (
    <div className={styles.firstSectionContainer}>
        <div className={styles.firstSectionBody}>
            <div className={styles.firstSectionH2}>
                <h2 className={styles.lightBlue}>Discover.</h2>
                <h2 className={styles.middleBlue}>Research.</h2>
                <h2 className={styles.darkBlue}>Through Knowglet.</h2>
            </div>
            <div className={styles.firstSectionButtons}>
                <div
                    className={styles.button}
                    onClick={props.scrollToSearchSection}
                >
                    Start
                </div>
            </div>
        </div>
    </div>
);

export default FirstSection;
