import Link from 'next/link';
import React from 'react';

const HeaderMiddleThree = () => {
    return (
        <div className="bd-topbar-area__middle d-none d-lg-block">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xxl-6 col-xl-6 col-md-8">
                        <div className="bd-topbar__contact">
                            {/* <ul>
                                <li><Link href="tel:+(02)587-898-250"><i className="fa-regular fa-phone-flip"></i>+(02) 587 - 898 -250</Link></li>
                                <li><Link href=""><i className="fa-solid fa-location-dot"></i>Favicon, New York, USA - 254230</Link></li>
                            </ul> */}
                        </div>
                    </div>
                    {/* <div className="col-xxl-6 col-xl-6 col-md-4">
                        <div className="bd-treak__right bd-treak__right3">
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
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default HeaderMiddleThree;