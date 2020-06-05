import React from "react";

import styles from "../../styles/components/popups/FeedbackPopUp.module.sass";

const FeedbackPopUp = props => (
    <>
        <div className={styles.feedbackPopUp}>
            <h3>
                <span className={styles.feedbackPopUpText1}>Thank you for</span>
                <div className={styles.feedbackPopUpText2}>your Feedback!</div>
            </h3>
            <button className={styles.button} onClick={props.closePopUp}>
                OK
            </button>
        </div>
        <div
            className={styles.overlay}
            id="overlay"
            onClick={props.closePopUp}
        />
    </>
);

export default FeedbackPopUp;
