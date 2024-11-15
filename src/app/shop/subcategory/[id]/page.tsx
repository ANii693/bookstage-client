"use client"
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import ShopSectionSubCategoryWise from '@/components/shop/subcategory-product/ShopSectionSubCategoryWise';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const SubCategoryWizeProductPage = ({ params }: { params: { id: string } }) => {
    const id =  params.id
    return (
        <>
            <Wrapper>
                <main>
                    <Breadcrumb breadHome="Home" breadMenu="Shop"/>
                     <ShopSectionSubCategoryWise id={id}/>
                </main>
            </Wrapper>
        </>
    );
};

export default SubCategoryWizeProductPage;