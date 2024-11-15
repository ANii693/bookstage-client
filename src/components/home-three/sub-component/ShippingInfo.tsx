
import PaymentIcon from '@/sheardComponent/elements/icons/payment-icon';
import ReturnIcon from '@/sheardComponent/elements/icons/return-icon';
import ShippingIcon from '@/sheardComponent/elements/icons/shipping-icon';
import SupportIcon from '@/sheardComponent/elements/icons/support-icon';
import Link from 'next/link';
import React from 'react';

const ShippingInfo = () => {
    return (
        <>
            <div className="bd-sm__features-wrapper mb-30">
            <div className="bd-features__item mb-20">
                <div className="bd-features__icon">
                    <ShippingIcon/>
                </div>
                <div className="bd-features__content">
                    <h4><Link href="/about">Free Shipping</Link></h4>
                    <span>On All Order Over $599</span>
                </div>
            </div>
            <div className="bd-features__item mb-20">
                <div className="bd-features__icon">
                    <ReturnIcon />
                </div>
                <div className="bd-features__content">
                    <h4><Link href="/about">Easy Returns</Link></h4>
                    <span>30 Day Returns Policy</span>
                </div>
            </div>
            <div className="bd-features__item mb-20">
                <div className="bd-features__icon">
                    <PaymentIcon />
                </div>
                <div className="bd-features__content">
                    <h4><Link href="/about">Secure Payment</Link></h4>
                    <span>100% Secure Gaurantee</span>
                </div>
            </div>
            <div className="bd-features__item">
                <div className="bd-features__icon">
                    <SupportIcon />
                </div>
                <div className="bd-features__content">
                    <h4><Link href="/about">Special Support</Link></h4>
                    <span>24/7 Dedicated Support</span>
                </div>
            </div>
        </div>
        </>
    );
};

export default ShippingInfo;