import React from 'react';
import Breadcrumb from '../common/breadcrumb/Breadcrumb';
import CartSection from './CartSection';

const CartMain = () => {
    return (
        <>
            <Breadcrumb breadHome='Home' breadMenu='Cart Items'/>
            <CartSection/>
        </>
    );
};

export default CartMain;