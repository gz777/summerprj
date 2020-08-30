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

import AddRoot from "./AddRoot";
import AddTerm from "./AddTerm";
import { Footer, Header } from "../../components/common";
import Mobile from "../../components/mobile";
import EditTerm from "./EditTerm";
import { notebook } from "../../resources";

import styles from "../../styles/pages/Ontology.module.sass";

export default class Ontology extends Component {
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
        exist: false
    };

    saveOntology = () => {
        const currentOntologie = this.state.treeData;
        const ontologies = this.state.ontologies;

        if (ontologies.length === 0) {
            this.setState({
                ontologies: [...ontologies, currentOntologie],
                isNewOntologyBtn: true,
                exist: true
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
        // eslint-disable-next-line
        ontologies.map(ontology => {
            if (ontology[0].id === currentOntologie[0].id) {
                let itemIndex = ontologies.indexOf(ontology);
                let newArray = [...ontologies];
                newArray[itemIndex] = currentOntologie;
                this.setState({
                    ontologies: newArray,
                    exist: true
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
        });
        // eslint-disable-next-line
        ontologies.map(() => {
            if (ontologies.length < 3 && this.state.exist === false) {
                this.setState({
                    ontologies: [...ontologies, currentOntologie],
                    exist: true
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
        });
    };

    changeOntology = e => {
        const ontology = JSON.parse(localStorage.getItem("ontologies"));
        // eslint-disable-next-line
        ontology.map(ont => {
            if (ont[0].title === e.target.value) {
                this.setState({
                    ontologyName: ont[0].title,
                    treeData: ont,
                    exist: true
                });
            }
        });
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
                exist: false
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
    handleDeleteOntology = () => {
        const currentOnt = JSON.parse(localStorage.getItem("terms"))[0].id;
        const ontDB = JSON.parse(localStorage.getItem("ontologies"));
        const confirmation = window.confirm(
            "Are you sure to delete the current Ontology?"
        );
        // eslint-disable-next-line
        const newDB = ontDB.filter(ont => {
            if (ont[0].id !== currentOnt) {
                return ont;
            }
        });

        if (confirmation) {
            this.setState({
                ontologies: newDB,
                treeData: [],
                ontologyName: "Select an"
            });
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

    componentDidMount() {
        document.title = `Knowglet - Ontology`;

        try {
            const json = localStorage.getItem("terms") || [];
            const ontologyName = localStorage.getItem("ontologyName");
            const terms = JSON.parse(json);

            document.title = `Knoogle - ${ontologyName} Ontology`;

            this.setState({
                isNewOntology: false,
                ontologyName: ontologyName,
                treeData: terms,
                ontologies: JSON.parse(
                    localStorage.getItem("ontologies")
                ) /*******    NEW     *****/
            });
        } catch (error) {
            // Error handling
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.ontologyName !== this.state.ontologyName ||
            prevState.treeData !== this.state.treeData ||
            prevState.ontologies !==
                this.state.ontologies /*******    NEW     *****/
        ) {
            const terms = JSON.stringify(this.state.treeData);

            localStorage.setItem("ontologyName", this.state.ontologyName);
            localStorage.setItem(
                "ontologies",
                JSON.stringify(this.state.ontologies)
            ); /*******    NEW     *****/
            localStorage.setItem("terms", terms);

            document.title = `Knowglet - ${this.state.ontologyName} Ontology`;
        }
    }

    componentWillUnmount() {
        document.title = "Knowglet";
    }

    render() {
        let display = { display: "none" };

        if (this.state.ontologyName) {
            display = { display: "block" };
        }

        const canDrop = ({ node, nextParent, prevPath, nextPath }) => {
            return !(prevPath.indexOf(0) >= 0 && nextPath.indexOf(0) < 0);
        };

        const getNodeKey = ({ node }) => node.id;

        return (
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
                        handleOntologyNameInput={this.handleOntologyNameInput}
                    />
                )}
                <AddTerm
                    terms={this.state.treeData}
                    addTermIsOpen={this.state.addTermIsOpen}
                    close={this.closeModal}
                    handleAddTerm={this.handleAddTerm}
                    ontologyName={this.state.ontologyName}
                />
                {this.state.isEditTermOpen && (
                    <EditTerm
                        close={this.closeModal}
                        isEditTermOpen={this.state.isEditTermOpen}
                        term={this.state.node.title}
                        description={this.state.node.subtitle}
                        handleEditTerm={this.handleEditTerm}
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
                                {this.state.ontologies.length !==
                                0 /*******    NEW     *****/
                                    ? this.state.ontologies.map(ontologies => (
                                          <li className={styles.ontListButton}>
                                              <button
                                                  onClick={this.changeOntology}
                                                  value={ontologies[0].title}
                                              >
                                                  {ontologies[0].title.length <=
                                                  17
                                                      ? ontologies[0].title
                                                      : ontologies[0].title
                                                            .substring(0, 20)
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
                                <button onClick={this.handleCreateNewOntology}>
                                    Create New Ontology
                                </button>
                            ) : null}{" "}
                            {/*******    NEW     *****/}
                            <button onClick={this.saveOntology}>
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

                                                    if (confirmNodeDeletion) {
                                                        this.setState(
                                                            prevState => ({
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
    }
}
