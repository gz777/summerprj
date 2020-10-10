import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase, { FirebaseContext } from "../firebase";
import firebases from "../firebase/firebase";
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

function AppRouter() {
    const [searchTerm, setSearchTerm] = useState("");
    const [jsonTree, setJsonTree] = useState("");

    const handleTermChange = payload => {
        setSearchTerm(payload);
    };

    const handleJsonTree = payload => {
        setJsonTree(payload);
    };

    const [user] = useAuthState(firebases.auths());

    return (
        <FirebaseContext.Provider value={{ firebase, user }}>
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={() => (
                            <Homepage
                                searchTerm={searchTerm}
                                jsonTree={jsonTree}
                                handleJsonTree={handleJsonTree}
                                handleTermChange={handleTermChange}
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
                                user={user}
                                searchTerm={searchTerm}
                                jsonTree={jsonTree}
                                handleJsonTree={handleJsonTree}
                                handleTermChange={handleTermChange}
                            />
                        )}
                    />
                    <Route
                        path="/search/:query?"
                        component={() => (
                            <Search
                                searchTerm={searchTerm}
                                jsonTree={jsonTree}
                                handleJsonTree={handleJsonTree}
                                handleTermChange={handleTermChange}
                            />
                        )}
                    />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </FirebaseContext.Provider>
    );
}
export default AppRouter;
