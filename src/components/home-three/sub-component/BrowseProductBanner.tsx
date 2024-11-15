import productList from '@/data/products';
import Link from 'next/link';
import React from 'react';


const BrowseProductBanner = () => {
    return (
        <div className="bd-singel__banner-wrapper mb-40">
            {productList &&
            <div className="row">
                {productList.slice(59, 62).map((item, num) => (
                <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6" key={num}>
                    <div className="bd-singel__product-banner product-thumb-bg-3 mb-30" style={{ backgroundImage: `url(${item.productImg})`}}>
                        <div className="bd-product__banner-inner">
                            <div className="bd-product__banner-content product__content-5">
                                <span>{item.productTag}</span>
                                <h3><Link href="/shop">{item.productTitle}</Link></h3>
                                <div className="product__banner-price">
                                    <h4>${item.price}</h4>
                                </div>
                                <Link className="bd-bn__btn-5" href="/shop">{item.productBtn}</Link>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            }
        </div>
    );
};

export default BrowseProductBanner;