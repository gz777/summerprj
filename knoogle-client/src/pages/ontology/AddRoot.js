import React, { Component } from "react";

import styles from "../../styles/components/popups/AddRoot.module.sass";

class Modal extends Component {
    state = {
        description: "",
        isNewTerm: true
    };

    componentWillUnmount() {
        this.setState({
            description: ""
        });
    }

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
                        <h3>Establish Root</h3>
                    </div>
                    <div className={styles.modalBody}>
                        <label htmlFor="name">Name:</label>
                        <input
                            onChange={this.props.handleOntologyNameInput}
                            type="text"
                            id="name"
                            placeholder="Example: Computer"
                        />
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            placeholder="Example: https://google.com"
                            onChange={this.handleDescriptionChange}
                            value={this.state.description}
                        />
                    </div>
                    <div
                        className={styles.button}
                        onClick={() =>
                            this.props.handleNewOntologyName(
                                this.state.description
                            )
                        }
                    >
                        {this.state.isNewTerm ? "Add" : "Edit"}
                    </div>
                </div>
                <div
                    className={styles.overlay}
                    id="overlay"
                    onClick={this.props.close}
                />
            </div>
        );

        if (!this.props.addRootIsOpen) {
            popUp = null;
        }

        return <div>{popUp}</div>;
    }
}

export default Modal;
