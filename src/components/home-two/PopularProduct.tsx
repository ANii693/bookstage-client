import Link from 'next/link';
import React from 'react';
import productList from '../../data/products';
import TopRatedProduct from './subComponent/TopRatedProduct';
import Popular from './subComponent/Popular';
import thumb from "../../../public/assets/img/trending/flash/flash-banner-02.jpg"
import Image from 'next/image';
const PopularProduct = () => {
    return (
        <div className="bd__populer-wrapper">
            {productList &&
                <div className="row">
                    <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6">
                        {/* top rated product */}
                        <TopRatedProduct/>
                    </div>
                    <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6">
                        <Popular/>
                    </div>
                    <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-8">
                        <Link href="/shop">
                            <div className="bd-flash___banner-item mb-30 p-relative">
                                <div className="bd-flash__banner-thumb w-img">
                                    <Image style={{ width: "100%", height: "auto" }} src={thumb} alt="flash-banner" />
                                </div>
                                <div className="bd-flash__banner-content">
                                    <h4>Freshly</h4>
                                    <h3>Maitta Potato</h3>
                                    <h6>From<span className="price">$9.00</span></h6>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default PopularProduct;