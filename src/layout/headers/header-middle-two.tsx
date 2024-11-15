import Link from 'next/link';
import React from 'react';

const HeaderMiddleTwo = () => {
    return (
        <div className="bd-header__middle theme-bg d-none d-sm-block">
            <div className="bd-header__middle-area-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <div className="bd-header__top-link">
                                <Link href="/about">About Us</Link>
                                <Link href="/login">My account</Link>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <div className="style-2">
                                <div className="bd-treak__right">
                                    <div className="border-lefts">
                                        <select name="lan-select" id="lan-select" className="language-select">
                                            <option defaultValue="1">English</option>
                                            <option defaultValue="2">Hindi</option>
                                            <option defaultValue="3">Arabic</option>
                                            <option defaultValue="4">Bengali</option>
                                            <option defaultValue="5">French</option>
                                        </select>
                                    </div>
                                    <div className="border-left">
                                        <select name="currency-select" id="currency-select" className="currency-select border-left">
                                            <option defaultValue="1">USD</option>
                                            <option defaultValue="2">EUR</option>
                                            <option defaultValue="3">JPY</option>
                                            <option defaultValue="4">GBP</option>
                                            <option defaultValue="5">IND</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMiddleTwo;