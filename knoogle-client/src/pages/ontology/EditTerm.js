/*
    File: src/pages/ontology/EditTerm.js
    Written by : Diego Taveras & Jerry Turcios
*/

import React, { Component } from "react";

import styles from "../../styles/components/popups/AddRoot.module.sass";

class EditTerm extends Component {
    state = {
        term: this.props.term,
        description: this.props.description
    };

    componentWillUnmount() {
        this.setState({
            description: "",
            term: ""
        });
    }

    handleTermChange = e => {
        this.setState({
            term: e.target.value
        });
    };

    handleDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    };

    render() {
        let popUp = (
            <div className={styles.modalContainer}>
                <div className={styles.modal} id="modal">
                    <div className={styles.modalHeader}>
                        <h3>Edit Term</h3>
                    </div>
                    <div className={styles.modalBody}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="termName"
                            placeholder={"Windows (required)"}
                            value={this.state.term}
                            onChange={this.handleTermChange}
                        />
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            placeholder='"https://google.com"'
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}
                        />
                    </div>
                    <div
                        className={styles.button}
                        onClick={() =>
                            this.props.handleEditTerm(
                                this.state.term,
                                this.state.description
                            )
                        }
                    >
                        Save
                    </div>
                </div>
                <div
                    className={styles.overlay}
                    id="overlay"
                    onClick={this.props.close}
                />
            </div>
        );

        if (!this.props.isEditTermOpen) {
            popUp = null;
        }

        return <div>{popUp}</div>;
    }
}

export default EditTerm;
