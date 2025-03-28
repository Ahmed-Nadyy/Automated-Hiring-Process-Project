import React, { useState } from 'react';
import Navbar from './Navbar';
import Body from './Body';
import SponsersSection from './SponsersSection';
import Footer from './Footer';
import Tracks from './Tracks';

export default function HomePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTag, setActiveTag] = useState("Home");
    const headerTags = ["Home" ,"Tracks","Careers"];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (
        <>
            <Navbar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                activeTag={activeTag}
                setActiveTag={setActiveTag}
                headerTags={headerTags}
                toggleMobileMenu={toggleMobileMenu}
            />
            {activeTag === "Home" && <Body />}
            {activeTag === "Tracks" && <Tracks />}
            <SponsersSection />
            <Footer />
        </>
    );
}
