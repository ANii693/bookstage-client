import FeatureIconFour from '@/sheardComponent/elements/icons/feature-icon-four';
import FeatureIconOne from '@/sheardComponent/elements/icons/feature-icon-one';
import FeatureIconThree from '@/sheardComponent/elements/icons/feature-icon-three';
import FeatureIconTwo from '@/sheardComponent/elements/icons/feature-icon-two';
import Link from 'next/link';
import React from 'react';


const FeatureSection = () => {
    return (
        <section className="bd-features__area pt-70 pb-40">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                <FeatureIconOne />
                            </div>
                            <div className="bd-features__content">
                                <h4><Link href="/shop">Free Shipping</Link></h4>
                                <span>On All Order Over $599</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                <FeatureIconTwo />
                            </div>
                            <div className="bd-features__content">
                                <h4><Link href="/shop">Easy Returns</Link></h4>
                                <span>30 Day Returns Policy</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                <FeatureIconThree/>
                            </div>
                            <div className="bd-features__content">
                                <h4><Link href="/shop">Secure Payment</Link></h4>
                                <span>100% Secure Gaurantee</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="bd-features__item mb-30">
                            <div className="bd-features__icon">
                                <FeatureIconFour />
                            </div>
                            <div className="bd-features__content">
                                <h4><Link href="/shop">Special Support</Link></h4>
                                <span>24/7 Dedicated Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;