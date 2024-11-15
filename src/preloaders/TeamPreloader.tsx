import { productsPreloader } from '@/data/preloader-data';
import React from 'react';

const TeamPreloader = () => {
    return ( 
        <>
             {productsPreloader.map((item, num) => (
              <div className="col-xl-3  col-lg-4 col-md-6" key={num}>
                <div className="bd-team__wrapper text-center mb-30">
                  <div className="bd-team__thumb w-img p-relative og-div-bg-2">
                 
                  </div>
                  
                </div>
              </div>
            ))}
        </>
    );
};

export default TeamPreloader;