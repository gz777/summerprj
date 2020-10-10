import React, { Component } from "react";

import styles from "../../styles/components/popups/AddRoot.module.sass";

class Modal extends Component {
    state = {
        description: "",
        isNewTerm: true,
        term: ""
    };

    componentWillUnmount() {
        this.setState({
            description: "",
            term: ""
        });
    }

    handleDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    };

    render() {
        this.termName = React.createRef();

        let popUp = (
            <div className={styles.modalContainer}>
                <div className={styles.modal} id="modal">
                    <div className={styles.modalHeader}>
                        <h3>Create a New Term</h3>
                    </div>
                    <div className={styles.modalBody}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="termName"
                            placeholder="Example: Desktop"
                            ref={this.termName}
                        />
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            placeholder="Example: https://google.com"
                            value={this.description}
                            onChange={this.handleDescriptionChange}
                        />
                    </div>
                    <div
                        className={styles.button}
                        onClick={() => {
                            this.props.handleAddTerm(
                                Date.now(),
                                this.termName.current.value,
                                this.state.description
                            );
                            //enable the save button
                            this.props.enableButton();
                        }}
                    >
                        Add
                    </div>
                </div>
                <div
                    className={styles.overlay}
                    id="overlay"
                    onClick={this.props.close}
                />
            </div>
        );

        if (!this.props.addTermIsOpen) {
            popUp = null;
        }

        return <div>{popUp}</div>;
    }
}

export default Modal;
