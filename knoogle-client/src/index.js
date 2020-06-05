import React from "react";
import ReactDOM from "react-dom";
// import * as Sentry from "@sentry/browser";

import AppRouter from "./routes/AppRouter";

import "react-app-polyfill/ie11";
import "react-sortable-tree/style.css";
import "./styles/style.sass";

// Initializes the Sentry SDK in a production environment only. The setup
// occurs prior to the application mounting.
// if (process.env.NODE_ENV === "production") {
//     Sentry.init({
//         dsn: process.env.REACT_APP_SENTRY_DSN
//     });
// }

ReactDOM.render(<AppRouter />, document.getElementById("root"));
