/*
    File: src/components/mobile/Mobile.js
    Written by : Diego Taveras & Jerry Turcios
*/
import React, { useRef } from "react";

import MobileNav from "./MobileNav";
import MobileSitemap from "./MobileSitemap";

export default function Mobile() {
    const mobileSitemapRef = useRef();

    function closeMobileSitemap() {
        mobileSitemapRef.current.style.display === ""
            ? (mobileSitemapRef.current.style.display = "flex")
            : (mobileSitemapRef.current.style.display = "");
    }

    return (
        <>
            <MobileNav closeMobileSitemap={closeMobileSitemap} />
            <MobileSitemap
                closeMobileSitemap={closeMobileSitemap}
                mobileSitemapRef={mobileSitemapRef}
            />
        </>
    );
}
