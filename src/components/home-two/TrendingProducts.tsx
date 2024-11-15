import React from 'react';
import BrowseProductSlider from '../home-three/sub-component/BrowseProductSlider';
import FlashBanner from '../home-three/sub-component/FlashBanner';
import TrendingProductBanner from './TrendingProductBanner';
import PopularProduct from './PopularProduct';
import FlashProductSlider from './FlashProductSlider';
import ProductTestSlider from './ProductTestSlider';
import DownloadText from './DownloadText';


const TrendingProducts = () => {
    return (
        <section className="bd-trending__big-area mb-100">
            <div className="container">
                <div className="row">
                    <div className="col-xxl-9 col-xl-8 col-lg-12 col-md-12 order-xl-2">
                        <BrowseProductSlider />
                        <TrendingProductBanner />
                        <PopularProduct />
                    </div>
                    <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-8 order-xl-1">
                        <div className="row">
                            <FlashProductSlider />
                            <FlashBanner />
                            <ProductTestSlider />
                            <DownloadText />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;