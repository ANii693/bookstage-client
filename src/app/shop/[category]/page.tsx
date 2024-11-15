import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import ShopSectionCategoryWize from '@/components/shop/categoryWizeShop/ShopSectionCategoryWize';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const ShopPageCategoryWize = ({ params }: { params: { category: string } }) => {
    const category =  params.category
    return (
        <>
            <Wrapper>
                <main>
                    <Breadcrumb breadHome="Home" breadMenu="Shop"/>
                    <ShopSectionCategoryWize category={category}/>
                </main>
            </Wrapper>
        </>
    );
};

export default ShopPageCategoryWize;