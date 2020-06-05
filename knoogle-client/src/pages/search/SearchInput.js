import React from "react";
import { Link } from "react-router-dom";

import { searchLightbulb, tutorial, aboutUsIcon } from "../../resources/index";

import styles from "../../styles/components/search/SearchInput.module.sass";

const SearchInput = props => (
    <div className={styles.SearchComponentHeader}>
        <div className={styles.logo}>
            <Link to="/">
                <img src={searchLightbulb} alt="" />
            </Link>
        </div>
        <form
            className={styles.SearchInputForm}
            onSubmit={props.handleSearchRequest}
        >
            <input
                className={styles.SearchInput}
                onChange={props.handleSearchInput}
                type="text"
                value={props.searchInput}
            />
        </form>
        <div className={styles.menu}>
            <ul>
                <li>
                    <i className={styles.icon}>
                        <img src={tutorial} alt="" />
                    </i>
                    <Link to="/tutorial">Tutorial</Link>
                </li>
                <li>
                    <i className={styles.icon}>
                        <img src={aboutUsIcon} alt="" />
                    </i>
                    <Link to="/about">About us</Link>
                </li>
            </ul>
        </div>
    </div>
);

export default SearchInput;
