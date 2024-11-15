"use client"

import React from 'react';
import HeroSection from './HeroSection';
import ServiceSection from './ServiceSection';
import AboutSection from './AboutSection';
import ProductSlider from './ProductSlider';
import ChooseSection from './ChooseSection';
import FactSection from './FactSection';
import BlogSection from '../home-three/BlogSection';


const HomeMain = () => {
    
    return (
        <>
            <HeroSection/>
            <ServiceSection/>
            <AboutSection/>
            <ProductSlider/>
            <ChooseSection/>
            <FactSection/>
            <BlogSection/>
        </>
    );
};

export default HomeMain;