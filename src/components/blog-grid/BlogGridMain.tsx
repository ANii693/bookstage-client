import React from 'react';
import Breadcrumb from '../common/breadcrumb/Breadcrumb';
import BlogGridSection from './BlogGridSection';

const BlogGridMain = () => {
    return (
        <>
           <Breadcrumb breadHome={'Home'} breadMenu={'Blog Grid'} /> 
           <BlogGridSection/>
        </>
    );
};

export default BlogGridMain;