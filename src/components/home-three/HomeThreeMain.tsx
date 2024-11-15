import React from 'react';
import HeroSectionThree from './HeroSectionThree';
import CategorySlider from './CategorySlider';
import TrendingProducts from './TrendingProducts';
import NewsletterSection from './NewsletterSection';
import BlogSection from './BlogSection';

const HomeThreeMain = () => {
    return (
        <>
            <HeroSectionThree/>
            <CategorySlider/>
            <TrendingProducts/>
            <NewsletterSection/>
            <BlogSection/>
        </>
    );
};

export default HomeThreeMain;