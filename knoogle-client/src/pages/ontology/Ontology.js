/*
    File: src/pages/ontology/Ontology.js
    Written by : Diego Taveras & Jerry Turcios
*/

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import SortableTree, {
    addNodeUnderParent,
    changeNodeAtPath,
    removeNodeAtPath
} from "react-sortable-tree";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FirebaseContext from "../../firebase/context";
import AddRoot from "./AddRoot";
import AddTerm from "./AddTerm";
import { Footer, Header } from "../../components/common";
import Mobile from "../../components/mobile";
import EditTerm from "./EditTerm";
import { notebook } from "../../resources";
import styles from "../../styles/pages/Ontology.module.sass";
import SignIn from "./../profile/SignIn";

export default class Ontology extends Component {
    mounted = false;
    static contextType = FirebaseContext;

    state = {
        isNewOntology: true,
        addRootIsOpen: false,
        addTermIsOpen: false,
        isEditTermOpen: false,
        getNodeKey: null,
        node: null,
        path: null,
        ontologyName: "",
        ontologies: [],
        ontologyNameInput: "",
        redirect: false,
        searchInput: "",
        treeData: [],
        isNewOntologyBtn: false,
        exist: true,
        currentUser: this.context.user,
        title: "",
        disableBtn: true,
        btnClass: "disable"
    };

    handleSaveOntology = async () => {
        const firebase = this.context.firebase;
        const currentUser = this.state.currentUser;
        this.setState({
            disableBtn: true
        });

        if (this.state.exist) {
            const ontID = this.state.treeData[0].id;
            const docRef = firebase.db
                .collection("users")
                .doc(currentUser.email)
                .collection("ontologies");
            let docID = "";
            docRef.get().then(snapshot => {
                // eslint-disable-next-line
                snapshot.docs.map(doc => {
                    if (doc.data().ontology[0].id === ontID) {
                        docID = doc.id;
                    }
                });
                docRef.doc(docID).update({
                    ontology: this.state.treeData
                });
                this.setState({
                    ontologies: []
                });
            });
            toast.success("Updated Succesfully", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        } else if (
            this.state.ontologies.length <= 3 &&
            this.state.exist === false
        ) {
            this.setState({
                ontologies: [],
                exist: true
            });
            await firebase.db
                .collection("users")
                .doc(this.state.currentUser.email)
                .collection("ontologies")
                .add({
                    ontology: this.state.treeData
                });

            toast.success("Save Succesfully", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    };

    handleChangeOntology = e => {
        const ontologies = this.state.ontologies;
        // eslint-disable-next-line
        ontologies.map(ont => {
            if (ont.id === e.target.value) {
                let ontArray = [];
                ontArray.push(ont);
                this.setState({
                    ontologyName: ont.title,
                    treeData: ontArray,
                    exist: true
                });
            }
        });
    };
    handleDeleteOntology = () => {
        this.setState({
            ontologies: []
        });
        const firebase = this.context.firebase;
        const currentOnt = this.state.treeData[0].id;
        const confirmation = window.confirm(
            "Are you sure to delete the current Ontology?"
        );

        if (confirmation) {
            // this.state.currentUser renders null first
            // ,whith this condition it waits ultil its
            // different than null
            if (this.state.currentUser) {
                firebase.db
                    .collection("users")
                    .doc(this.state.currentUser.email)
                    .collection("ontologies")
                    .onSnapshot(snapshot => {
                        // eslint-disable-next-line
                        snapshot.docs.map(doc => {
                            // Getting the document ID from firebase
                            // in order to delete the correct one
                            if (currentOnt === doc.data().ontology[0].id) {
                                firebase.db
                                    .collection("users")
                                    .doc(this.state.currentUser.email)
                                    .collection("ontologies")
                                    .doc(doc.id)
                                    .delete();
                            }
                        });
                    });
                this.setState({
                    treeData: []
                });
            }

            toast.error("Deleted Succesfully", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    };
    openAddRoot = () => {
        this.setState({
            addRootIsOpen: true
        });
    };

    openAddTerm = () => {
        this.setState({
            addTermIsOpen: true
        });
    };

    openEditTerm = () => {
        this.setState({
            isEditTermOpen: true
        });
    };

    closeModal = () => {
        this.setState({
            addRootIsOpen: false,
            addTermIsOpen: false,
            isEditTermOpen: false
        });
    };

    enableButton = () => {
        this.setState({
            disableBtn: false
        });
    };

    handleAddTerm = (id, term, description) => {
        if (term.trim()) {
            if (this.state.path) {
                this.setState(prevState => ({
                    treeData: addNodeUnderParent({
                        treeData: prevState.treeData,
                        parentKey: this.state.path[this.state.path.length - 1],
                        expandParent: true,
                        getNodeKey: this.state.getNodeKey,
                        newNode: {
                            id: uuidv4(),
                            title: term,
                            subtitle: description,
                            children: []
                        },
                        addAsFirstChild: prevState.addAsFirstChild
                    }).treeData,
                    addTermIsOpen: false,
                    getNodeKey: null,
                    path: null
                }));
            } else {
                const oldTreeData = [...this.state.treeData];
                oldTreeData.push({
                    id: uuidv4(),
                    title: term,
                    subtitle: description,
                    children: []
                });
                this.setState({
                    treeData: oldTreeData,
                    addTermIsOpen: false
                });
            }
        }
    };

    handleEditTerm = (term, description) => {
        if (term.trim() && this.state.node.id !== 0) {
            this.setState(prevState => ({
                treeData: changeNodeAtPath({
                    treeData: prevState.treeData,
                    path: this.state.path,
                    getNodeKey: this.state.getNodeKey,
                    newNode: {
                        ...this.state.node,
                        title: term,
                        subtitle: description
                    }
                }),
                isEditTermOpen: false,
                getNodeKey: null,
                path: null
            }));
        } else {
            this.setState(prevState => ({
                treeData: changeNodeAtPath({
                    treeData: prevState.treeData,
                    path: this.state.path,
                    getNodeKey: this.state.getNodeKey,
                    newNode: {
                        ...this.state.node,
                        title: term,
                        subtitle: description
                    }
                }),
                isEditTermOpen: false,
                getNodeKey: null,
                ontologyName: term,
                path: null
            }));
        }
    };

    handleNewOntologyName = description => {
        if (this.state.ontologyNameInput.trim()) {
            this.setState({
                ontologyName: this.state.ontologyNameInput,
                addRootIsOpen: false
            });
            this.handleAddTerm(0, this.state.ontologyNameInput, description);
        }
    };

    handleResetTree = () => {
        const confirmReset = window.confirm(
            "Are you sure you want to reset the ontology? The ontology name and the added terms will be permanently removed."
        );

        if (confirmReset) {
            this.setState({
                ontologyName: "",
                treeData: []
            });
        }
    };
    handleCreateNewOntology = () => {
        const confirmReset = window.confirm(
            "Are you sure you want to reset create a new ontology"
        );

        if (confirmReset) {
            this.setState({
                ontologyName: "",
                treeData: [],
                exist: false,
                disableBtn: false
            });
        }
    };

    handleSearchInput = e => {
        this.setState({
            searchInput: e.target.value
        });
    };

    handleSearchRedirectValue = e => {
        e.preventDefault();

        if (this.state.searchInput.trim() !== "") {
            this.setState({
                redirect: true
            });
        }
    };

    redirectWithOntologyData = () => {
        // The ontology tree is converted into a string.
        const jsonifiedTree = JSON.stringify(this.state.treeData);
        this.props.handleJsonTree(jsonifiedTree);

        // The search input value is set to lower case for all letters. This is
        // required by the back-end search script.
        const formattedString = this.state.searchInput.toLocaleLowerCase();
        this.props.handleTermChange(formattedString);

        return <Redirect push to={`/search/${formattedString}`} />;
    };

    handleOntologyNameInput = e => {
        this.setState({
            ontologyNameInput: e.target.value
        });
    };

    componentDidMount() {
        this.mounted = true;
        let firebase = this.context.firebase;
        this.setState({
            disableBtn: true
        });
        // this.state.currentUser renders null first
        // ,whith this condition it waits ultil its
        // different than null
        if (this.state.currentUser) {
            firebase.db
                .collection("users")
                .doc(this.state.currentUser.email)
                .collection("ontologies")
                .onSnapshot(snapshot => {
                    // eslint-disable-next-line
                    snapshot.docs.map(doc => {
                        if (this.mounted) {
                            this.setState({
                                ontologies: [
                                    ...this.state.ontologies,
                                    doc.data().ontology[0]
                                ],
                                ontologyName: "Select an ",
                                treeData: []
                            });
                        }
                    });
                });
        }

        if (this.state.ontologies.length === 0) {
            this.setState({
                exist: false
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.ontologyName !== prevState.ontologyName) {
            document.title = `Knowglet - ${this.state.ontologyName} Ontology`;
        }
        if (this.state.ontologies !== prevState.ontologies) {
            if (
                this.state.ontologies.length === 0 &&
                this.state.treeData.length === 0
            ) {
                this.setState({
                    disableBtn: true
                });
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        document.title = "Knowglet";
    }

    render() {
        let display = { display: "none" };
        let component = "";
        if (this.state.ontologyName) {
            display = { display: "block" };
        }
        const canDrop = ({ node, nextParent, prevPath, nextPath }) => {
            return !(prevPath.indexOf(0) >= 0 && nextPath.indexOf(0) < 0);
        };
        const getNodeKey = ({ node }) => node.id;
        if (this.state.currentUser) {
            component = (
                <div className={styles.ontologyContainer}>
                    <ToastContainer
                        position="top-left"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <Mobile />
                    {this.state.redirect && this.redirectWithOntologyData()}
                    {this.state.addRootIsOpen && (
                        <AddRoot
                            isNewOntology={this.state.isNewOntology}
                            addRootIsOpen={this.state.addRootIsOpen}
                            close={this.closeModal}
                            handleNewOntologyName={this.handleNewOntologyName}
                            handleOntologyNameInput={
                                this.handleOntologyNameInput
                            }
                        />
                    )}
                    <AddTerm
                        terms={this.state.treeData}
                        addTermIsOpen={this.state.addTermIsOpen}
                        close={this.closeModal}
                        handleAddTerm={this.handleAddTerm}
                        ontologyName={this.state.ontologyName}
                        enableButton={this.enableButton}
                    />
                    {this.state.isEditTermOpen && (
                        <EditTerm
                            close={this.closeModal}
                            isEditTermOpen={this.state.isEditTermOpen}
                            term={this.state.node.title}
                            description={this.state.node.subtitle}
                            handleEditTerm={this.handleEditTerm}
                            enableButton={this.enableButton}
                        />
                    )}
                    <Header />
                    <div className={styles.ontology}>
                        <div className={styles.ontologyFirstSection}>
                            <div className={styles.textContainer}>
                                <h2>Create New.</h2>
                                <h2>Ontologies.</h2>
                            </div>
                            <div className={styles.buttonsContainer}>
                                {!this.state.ontologyName && (
                                    <>
                                        <p>Establish Root:</p>
                                        <div className={styles.buttons}>
                                            {!this.state.ontologyName && (
                                                <div
                                                    className={styles.button}
                                                    onClick={this.openAddRoot}
                                                >
                                                    Add Root
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.ontologySecondSection}>
                            <img src={notebook} alt="" />
                        </div>
                        <div
                            className={`${styles.buttonsContainer} ${
                                styles.mobileButtons
                            }`}
                        >
                            {!this.state.ontologyName && (
                                <>
                                    <p>Establish Root:</p>
                                    <div className={styles.buttons}>
                                        {!this.state.ontologyName && (
                                            <div
                                                className={styles.button}
                                                onClick={this.openAddRoot}
                                            >
                                                Add Root
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.ontologyCreation} style={display}>
                        {this.state.ontologies.length !== 0 ? (
                            <h2>{this.state.ontologyName} Ontology</h2>
                        ) : (
                            <h2>Create New Ontology</h2>
                        )}

                        <div className={styles.ontologyTreeContainer}>
                            <div className={styles.buttons}>
                                {this.state.ontologies.length >= 1 ? (
                                    <h3 className={styles.savedOntTitle}>
                                        Ontology list locally saved:
                                    </h3>
                                ) : null}
                                <ol className={styles.savedOntList}>
                                    {this.state.ontologies.length !== 0
                                        ? this.state.ontologies.map(ont => (
                                              <li
                                                  className={
                                                      styles.ontListButton
                                                  }
                                                  key={ont.id}
                                              >
                                                  <button
                                                      onClick={
                                                          this
                                                              .handleChangeOntology
                                                      }
                                                      value={ont.id}
                                                  >
                                                      {ont.title.length <= 17
                                                          ? ont.title
                                                          : ont.title
                                                                .substring(
                                                                    0,
                                                                    20
                                                                )
                                                                .concat("...")}
                                                  </button>
                                              </li>
                                          ))
                                        : null}
                                </ol>
                                <button onClick={this.handleResetTree}>
                                    Reset
                                </button>
                                {/* <button>Video Tutorial</button> */}
                                {this.state.ontologies.length >= 0 &&
                                this.state.ontologies.length < 3 ? (
                                    <button
                                        onClick={this.handleCreateNewOntology}
                                    >
                                        Create New Ontology
                                    </button>
                                ) : null}{" "}
                                {/*******    NEW     *****/}
                                <button
                                    disabled={this.state.disableBtn}
                                    onClick={this.handleSaveOntology}
                                    style={
                                        this.state.disableBtn
                                            ? { backgroundColor: "lightgray" }
                                            : { backgroundColor: "#6c89c3" }
                                    }
                                >
                                    Save Ontology
                                </button>
                                {this.state.ontologies.length >= 1 ? (
                                    <button
                                        style={{ backgroundColor: "red" }}
                                        onClick={this.handleDeleteOntology}
                                    >
                                        Delete Ontology
                                    </button>
                                ) : null}
                            </div>
                            <div className={styles.tree}>
                                <SortableTree
                                    canDrop={canDrop}
                                    treeData={this.state.treeData}
                                    onChange={treeData =>
                                        this.setState({ treeData })
                                    }
                                    getNodeKey={getNodeKey}
                                    generateNodeProps={({ node, path }) => ({
                                        buttons: [
                                            <button
                                                title={"Add child term"}
                                                onClick={() => {
                                                    this.openAddTerm();
                                                    this.setState({
                                                        getNodeKey,
                                                        path
                                                    });
                                                }}
                                            >
                                                +
                                            </button>,
                                            <button
                                                title={"Edit term"}
                                                onClick={() => {
                                                    this.setState({
                                                        getNodeKey,
                                                        node,
                                                        path
                                                    });
                                                    this.openEditTerm();
                                                }}
                                            >
                                                ✎️
                                            </button>,
                                            <button
                                                title={"Remove term"}
                                                onClick={() => {
                                                    if (node.id !== 0) {
                                                        const confirmNodeDeletion = window.confirm(
                                                            "Are you sure you want to remove this node? The selected node and its children terms will be permanently removed from the ontology."
                                                        );

                                                        if (
                                                            confirmNodeDeletion
                                                        ) {
                                                            this.setState(
                                                                prevState => ({
                                                                    disableBtn: false,
                                                                    treeData: removeNodeAtPath(
                                                                        {
                                                                            treeData:
                                                                                prevState.treeData,
                                                                            path,
                                                                            getNodeKey
                                                                        }
                                                                    )
                                                                })
                                                            );
                                                        }
                                                    } else {
                                                        this.handleResetTree();
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                        ]
                                    })}
                                />
                            </div>
                            <form
                                className={styles.mobileSearchBar}
                                onSubmit={this.handleSearchRedirectValue}
                            >
                                <div className={styles.ontologyTreeSearchBar}>
                                    <input
                                        type="text"
                                        className={styles.search}
                                        onChange={this.handleSearchInput}
                                    />
                                    <p>Search based on your Ontology.</p>
                                </div>
                            </form>
                        </div>
                        <form onSubmit={this.handleSearchRedirectValue}>
                            <div className={styles.ontologyTreeSearchBar}>
                                <input
                                    type="text"
                                    className={styles.search}
                                    onChange={this.handleSearchInput}
                                />
                                <p>Search based on your Ontology.</p>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
            );
        } else {
            component = <SignIn />;
        }

        return component;
    }
}
