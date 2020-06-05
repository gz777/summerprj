import React from "react";

import styles from "../../styles/components/search/SearchResults.module.sass";

const SearchResult = props => (
    <div className={styles.SearchResultContainer}>
        <a href={props.result.url} rel="noopener noreferrer" target="_blank">
            <p className={styles.SearchResultHeader}>{props.result.title}</p>
            <p className={styles.SearchResultUrl}>{props.result.url}</p>
        </a>
        <p className={styles.SearchResultDescription}>
            {props.result.description}
        </p>
        <div className={styles.line} />
    </div>
);

export default SearchResult;
