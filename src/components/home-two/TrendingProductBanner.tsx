import Link from 'next/link';
import React from 'react';
import productList from '../../data/products';

const TrendingProductBanner = () => {
  

    return (
        <div className="bd-banner__main-wrapper mb-40">
            <div className="banner-sm__style-2">
                {productList &&
                    <div className="row">
                        {productList.slice(43, 45).map((item, num) => (
                            <div className={item.columnClass} key={num}>
                                <div className="bd-singel__product-banner product-thumb-bg mb-30" style={{ backgroundImage: `url(${item.productImg})` }}>
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
        </div>
    );
};

export default TrendingProductBanner; 