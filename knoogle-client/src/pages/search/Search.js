import axios from "axios";
import React, { Component } from "react";

import API_URL from "../../api/config";
import { Footer } from "../../components/common";
import Mobile from "../../components/mobile";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

import styles from "../../styles/pages/Search.module.sass";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchRequest = this.handleSearchRequest.bind(this);
        this.state = {
            isLoading: true,
            isSearchErrorVisible: false,
            searchInput: "",
            results: []
        };
    }

    handleSearchInput(e) {
        this.setState({
            isSearchErrorVisible: false,
            searchInput: e.target.value
        });
    }

    handleSearchRequest(e) {
        e.preventDefault();

        this.setState({
            isLoading: true
        });

        if (this.state.searchInput.trim() !== "") {
            axios
                .post(`${API_URL}/api/search/results/`, {
                    term: this.state.searchInput,
                    jsonTree: this.props.jsonTree || "[]"
                })
                .then(response => {
                    this.setState({
                        isLoading: false,
                        results: response.data
                    });
                })
                .catch(error => {
                    this.setState({
                        isLoading: false,
                        isSearchErrorVisible: true
                    });
                });
        }
    }

    componentDidMount() {
        if (this.props.searchTerm.trim() !== "") {
            axios
                .post(`${API_URL}/api/search/results/`, {
                    term: this.props.searchTerm,
                    jsonTree: this.props.jsonTree || "[]"
                })
                .then(response => {
                    this.setState({
                        isLoading: false,
                        results: response.data,
                        searchInput: this.props.searchTerm
                    });
                })
                .catch(error => {
                    this.setState({
                        isLoading: false,
                        isSearchErrorVisible: true
                    });
                });
        } else {
            this.setState({
                isLoading: false
            });
        }

        document.title = "Knowglet - Search Results";
    }

    componentWillUnmount() {
        document.title = "Knowglet";

        this.props.handleTermChange("");
    }

    render() {
        return (
            <div>
                <Mobile />
                <div className={styles.searchContainer}>
                    <SearchInput
                        handleSearchInput={this.handleSearchInput}
                        handleSearchRequest={this.handleSearchRequest}
                        searchInput={this.state.searchInput}
                    />
                    {this.state.isLoading && (
                        <p className={styles.searchMessage}>Searching...</p>
                    )}
                    {this.state.results.length === 0 &&
                        !this.state.isLoading && (
                            <h1 className={styles.searchMessage}>
                                No results found
                            </h1>
                        )}
                    {this.state.isSearchErrorVisible && (
                        <p className={styles.searchMessage}>
                            An error occurred! Try searching again.
                        </p>
                    )}
                    {this.state.results.map(result => (
                        <SearchResult
                            result={result}
                            key={this.state.results.indexOf(result)}
                        />
                    ))}
                </div>
                <Footer />
            </div>
        );
    }
}
