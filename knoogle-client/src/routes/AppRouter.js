import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Password from "../pages/password";
import Homepage from "../pages/homepage";
import AboutUs from "../pages/aboutUs";
import Feedback from "../pages/feedback";
import NotFound from "../pages/notFound";
import Profile from "../pages/profile";
import Register from "../pages/register";
import Ontology from "../pages/ontology";
import Search from "../pages/search";
import Tutorial from "../pages/tutorial/Tutorial";
import TermsDisclaimer from "../pages/TermsDisclaimer";

export default class AppRouter extends Component {
    state = {
        searchTerm: "",
        jsonTree: ""
    };

    handleTermChange = payload => {
        this.setState({
            searchTerm: payload
        });
    };

    handleJsonTree = payload => {
        this.setState({
            jsonTree: payload
        });
    };

    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={() => (
                            <Homepage
                                searchTerm={this.state.searchTerm}
                                jsonTree={this.state.jsonTree}
                                handleJsonTree={this.handleJsonTree}
                                handleTermChange={this.handleTermChange}
                            />
                        )}
                    />
                    <Route path="/about" component={AboutUs} />
                    <Route path="/feedback" component={Feedback} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/auth/register" component={Register} />
                    <Route path="/password" component={Password} />
                    <Route path="/tutorial" component={Tutorial} />
                    <Route
                        path="/TermsDisclaimer"
                        component={TermsDisclaimer}
                    />

                    <Route
                        path="/ontology"
                        component={() => (
                            <Ontology
                                searchTerm={this.state.searchTerm}
                                jsonTree={this.state.jsonTree}
                                handleJsonTree={this.handleJsonTree}
                                handleTermChange={this.handleTermChange}
                            />
                        )}
                    />
                    <Route
                        path="/search/:query?"
                        component={() => (
                            <Search
                                searchTerm={this.state.searchTerm}
                                jsonTree={this.state.jsonTree}
                                handleJsonTree={this.handleJsonTree}
                                handleTermChange={this.handleTermChange}
                            />
                        )}
                    />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        );
    }
}
