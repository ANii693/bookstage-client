import Link from 'next/link';
import React from 'react';

const HeaderTop = () => {
    return (
        <div className="bd-top__bar-area-2 grey-bg-3 d-none d-lg-block">
            <div className="container-fluid">
                <div className="bd-top__bar-main d-flex justify-content-end">
                    <div className="col-xxl-10 col-xl-12 col-12">
                        <div className="row">
                            <div className="col-xxl-8 col-xl-8 col-lg-9">
                                <div className="bd-topbar__regtangle ">
                                    <div className="bd-topbar__contact">
                                        <ul>
                                            <li><Link href="tel:+(02)587-898-250"><i className="fa-regular fa-phone-flip"></i>+(02) 587 - 898 -250</Link></li>
                                            <li><Link href=""><i className="fa-solid fa-location-dot"></i>Favicon, New York, USA - 254230</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-3">
                                <div className="bd-top__bar-social">
                                <ul>
                            <li>Share:</li>
                            <li>
                              <Link href="https://www.facebook.com/" target="_blank">
                                <i className="fab fa-facebook-f"></i>
                              </Link>
                            </li>
                            <li>
                              <Link href="https://twitter.com/?lang=en" title="Twitter">
                                <i className="fab fa-twitter"></i>
                              </Link>
                            </li>
                            <li>
                              <Link href="https://www.linkedin.com/" title="Linkedin" target="_blank">
                                <i className="fab fa-linkedin"></i>
                              </Link>
                            </li>
                            <li>
                              <Link href="https://www.instagram.com/" target="_blank" title="Instagram">
                                <i className="fab fa-instagram"></i>
                              </Link>
                            </li>
                          </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;