import React from 'react';
import HeroSectionTwo from './HeroSectionTwo';
import FeatureSection from './FeatureSection';
import BannerSection from './BannerSection';
import ProductSliderTwo from './ProductSliderTwo';
import CategorySection from './CategorySection';
import TrendingProducts from './TrendingProducts';
import BrandSlider from './BrandSlider';
import BlogSection from '../home-three/BlogSection';

const HomeTwoMain = () => {
    return (
        <>
            <HeroSectionTwo/>
            <FeatureSection/>
            <BannerSection/>
            <ProductSliderTwo/>
            <ProductSliderTwo/> {/*2*/}
            <ProductSliderTwo/> {/*3*/}
            <CategorySection/>
            <TrendingProducts/>
            <BrandSlider/>
            <BlogSection/>
        </>
    );
};

export default HomeTwoMain;