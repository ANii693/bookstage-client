import React from 'react';
import Breadcrumb from '../common/breadcrumb/Breadcrumb';
import WishlistSection from './WishlistSection';

const WistListMain = () => {
    return (
        <><Breadcrumb breadHome="Home" breadMenu="Wishlist"/>
            <WishlistSection/>
        </>
    );
};

export default WistListMain;