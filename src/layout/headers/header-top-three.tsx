import Link from 'next/link';
import React from 'react';

const HeaderTopThree = () => {
    return (
        <div className="bd-top__bar-area theme-bg d-none d-sm-block">
            <div className="container">
                <div className="row align-content-center">
                    <div className="col-xxl-6 col-xl-6 col-md-8 col-sm-7">
                        <div className="bd-topbar__text">
                            <p>We ship to over 150 countries & region</p>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-md-4 col-sm-5">
                        <div className="bd-header__top-link justify-content-end">
                            <Link href="/about">About Us</Link>
                            <Link href="/wishlist">Wishlist</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTopThree;