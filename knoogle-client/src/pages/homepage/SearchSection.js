/*
    File: src/pages/homepage/SearchSection.js
    Written by : Diego Taveras & Jerry Turcios
*/

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { searchLogo, searchLogoOn } from "../../resources";

import styles from "../../styles/components/search/SearchSection.module.sass";

export default class SearchSection extends Component {
    constructor(props) {
        super(props);
        this.handleRedirectValue = this.handleRedirectValue.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.redirectWithSearchQuery = this.redirectWithSearchQuery.bind(this);
        this.state = {
            isSearchErrorVisible: false,
            redirect: false,
            searchInput: this.props.searchTerm
        };
    }

    handleRedirectValue(e) {
        e.preventDefault();

        if (this.state.searchInput.trim() !== "") {
            this.setState({
                redirect: true
            });
        }
    }

    handleSearchInput(e) {
        this.setState({
            isSearchErrorVisible: false,
            searchInput: e.target.value
        });
    }

    redirectWithSearchQuery() {
        this.props.handleTermChange(this.state.searchInput);
        this.props.handleJsonTree("[]");

        return <Redirect push to={`/search/${this.props.searchTerm}`} />;
    }

    render() {
        return (
            <form
                className={styles.searchSectionBody}
                onSubmit={this.handleRedirectValue}
                ref={this.props.jumpToSearchRef}
                id="searchSection"
            >
                <div className={styles.searchSectionMainContainer}>
                    {this.state.redirect && this.redirectWithSearchQuery()}
                    <div className={styles.searchSectionLogo} id="logo">
                        <img
                            src={searchLogo}
                            onMouseEnter={e =>
                                (e.currentTarget.src = searchLogoOn)
                            }
                            onMouseLeave={e =>
                                (e.currentTarget.src = searchLogo)
                            }
                            className={styles.mainLogo}
                            alt="Nav logo"
                        />
                    </div>
                    <div className={styles.searchSectionSearch}>
                        <input
                            className={styles.search}
                            onChange={this.handleSearchInput}
                            type="text"
                            value={this.state.searchInput}
                        />
                    </div>
                    {this.state.isSearchErrorVisible && (
                        <p>An error occurred! Try searching again.</p>
                    )}
                    <div className={styles.searchSectionButtons}>
                        <p>
                            The knowledge based search engine without all the
                            fluff.
                        </p>
                        <div className={styles.searchButtons}>
                            <div
                                className={[
                                    styles.button,
                                    styles.searchBtn
                                ].join(" ")}
                                onClick={this.handleRedirectValue}
                            >
                                Search
                            </div>
                            <Link to="/ontology">
                                <div
                                    className={[
                                        styles.button,
                                        styles.createOnt
                                    ].join(" ")}
                                >
                                    Create your own Ontology
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
