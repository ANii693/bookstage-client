import React from 'react';
import Link from 'next/link';

interface PropsData {
   breadHome: string | undefined,
   breadMenu: string | undefined
}

const Breadcrumb = ({ breadHome, breadMenu }: PropsData) => {
   return (
      <>
          <div className="breadcrumb-area pt-10 pb-10">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="breadcrumb__list">
                     <span><Link href="/">{breadHome}</Link></span>
                     <span className="dvdr"><i className="fa-regular fa-angle-right"></i></span>
                     <span>{breadMenu}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </>
   );
};

export default Breadcrumb;