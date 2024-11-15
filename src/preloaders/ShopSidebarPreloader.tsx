import React from 'react';
import { productsPreloader } from '@/data/preloader-data';
const ShopSidebarPreloader = ({end}:any) => {
    return (
        <>
            {productsPreloader?.length &&
            productsPreloader.slice(0,end).map((item, index) => (
              <div
                
                key={index}
                className="bd-singel__rating"
              >
              
                <label className="radio-star">
                  <div className="bd-product__icon custome-cursor text-capitalize or-category-name">
                      
                  </div>
                </label>
              </div>
            ))}
        </>
    );
};

export default ShopSidebarPreloader;