import Link from 'next/link';
import React from 'react';
import productList from '../../data/products';

const BannerSection = () => {
    return (
        <section className="bd-product-banner-area mb-40">
            <div className="container">
                {productList &&
                    <div className="row">
                        {productList.slice(20, 23).map((item, num) => (
                            <div className="col-xl-4 col-lg-6 col-md-6" key={num}>
                                <div className="bd-singel__product-banner product-thumb-bg mb-30" style={{ backgroundImage: `url(${item.productImg})`}}>
                                    <div className="bd-product__banner-inner">
                                        <div className={item.bannerClass}>
                                            <span>{item.productTag}</span>
                                            <h3><Link href="/shop">{item.productTitle}</Link></h3>
                                            <p>{item.productDesc}</p>
                                            <Link className="bd-bn__btn-3" href="/shop">{item.productBtn}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </section>
    );
};

export default BannerSection;