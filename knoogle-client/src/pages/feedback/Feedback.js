import React, { Component } from "react";

import { sendFeedback } from "../../api/feedback/feedback";
import { Header, Footer } from "../../components/common";
import Mobile from "../../components/mobile";
import FeedbackPopUp from "./FeedbackPopUp";
import { navLogo } from "../../resources";

import style from "../../styles/pages/Feedback.module.sass";

export default class Feedback extends Component {
    state = {
        name: "",
        email: "",
        comments: "",
        isPopUpVisible: false
    };

    handleNameInput = e => {
        this.setState({
            name: e.target.value
        });
    };

    handleEmailInput = e => {
        this.setState({
            email: e.target.value
        });
    };

    handleCommentsInput = e => {
        this.setState({
            comments: e.target.value
        });
    };

    handleFeedbackFormSubmission = e => {
        e.preventDefault();

        sendFeedback(
            this.state.name,
            this.state.email,
            this.state.comments
        ).then(() =>
            this.setState({
                name: "",
                email: "",
                comments: "",
                isPopUpVisible: true
            })
        );
    };

    closePopUp = () => {
        this.setState({
            isPopUpVisible: false
        });
    };

    componentDidMount() {
        document.title = "Knowglet - Feedback form";
    }

    componentWillUnmount() {
        document.title = "Knowglet";
    }

    render() {
        return (
            <div className={style.formContainer}>
                <Mobile />
                <Header />
                {this.state.isPopUpVisible && (
                    <FeedbackPopUp closePopUp={this.closePopUp} />
                )}
                <img
                    src={navLogo}
                    alt=""
                    className={style.feedBackLogoMobile}
                />
                <h2 className={style.formH2}>Let us know what you think!</h2>
                <form
                    onSubmit={this.handleFeedbackFormSubmission}
                    className={style.form}
                >
                    <label htmlFor="name" className={style.feedbackLabel}>
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className={style.feedbackInput}
                        onChange={this.handleNameInput}
                        placeholder="Type Name"
                        required
                        value={this.state.name}
                    />
                    <label htmlFor="email" className={style.feedbackLabel}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={style.feedbackInput}
                        onChange={this.handleEmailInput}
                        placeholder="example@gmail.com"
                        required
                        value={this.state.email}
                    />
                    <label htmlFor="comments" className={style.feedbackLabel}>
                        Comments
                    </label>
                    <textarea
                        id="comments"
                        cols="30"
                        rows="10"
                        className={style.feedbackTextarea}
                        onChange={this.handleCommentsInput}
                        placeholder="Type Your Comments Here"
                        required
                        value={this.state.comments}
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className={[style.feedbackSubmit, style.button].join(
                            " "
                        )}
                    />
                </form>
                <Footer />
            </div>
        );
    }
}
