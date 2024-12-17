//orignal
// import Link from 'next/link';
// import React from 'react';

// const HeaderTopTwo = () => {
//     return (
//         <div className="bd-top__bar-area-3 topbar-padding d-none d-lg-block ">
            
//             <div className="container ">
//                 <div className="row">
//                     <div className="col-xxl-6 col-xl-6 col-md-8">
//                         <div className="bd-topbar__contact">
//                             <ul>
//                                 <li><Link href="tel:+(02)587-898-250"><i className="fa-regular fa-phone-flip"></i>+(02) 587 - 898 -250</Link></li>
//                                 <li><Link href="#"><i className="fa-solid fa-location-dot"></i>Favicon, New York, USA - 254230</Link></li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="col-xxl-6 col-xl-6 col-md-4">
//                         <div className="bd-top__bar-social">
//                             <ul><li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
//                                 <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
//                                 <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
//                                 <li><Link href="#"><i className="fa-brands fa-pinterest-p"></i></Link></li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//         </div>

//     );
// };

// export default HeaderTopTwo;

// import Link from 'next/link';
// import React from 'react';

// const HeaderTopTwo = () => {
//     return (
//         <div className="bd-top__bar-area-3 theme-bg topbar-padding d-none d-lg-block"> {/* theme-bg  (making the color green)*/}
//             <div className="container">
//                 <div className="row">
//                     <div className="col-xxl-6 col-xl-6 col-md-8">
//                         <div className="bd-topbar__contact">
//                             <ul>
//                                 <li className='text-white'><Link href="tel:+(02)587-898-250"><i className="text-white fa-regular fa-phone-flip"></i >+(91) 98888 88888</Link></li>
//                                 <li className='text-white'><Link href="#"><i className=" text-white fa-solid fa-location-dot"></i>Bangalore, India - 560016</Link></li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="col-xxl-6 col-xl-6 col-md-4">
//                         <div className="bd-top__bar-social">
//                             <ul><li><Link href="#"><i className="text-white fa-brands fa-facebook-f"></i></Link></li>
//                                 <li><Link href="#"><i className="text-white fa-brands fa-twitter"></i></Link></li>
//                                 <li><Link href="#"><i className="text-white fa-brands fa-instagram"></i></Link></li>
//                                 {/* <li><Link href="#"><i className="fa-brands fa-pinterest-p"></i></Link></li> */}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HeaderTopTwo;


//simple
import Link from 'next/link';
import React from 'react';

const HeaderTopTwo = () => {
    return (
        <div className="bd-top__bar-area-3 topbar-padding d-none d-lg-block ">
            <p></p>
            <div className="container ">
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-md-8">
                        <div className="bd-topbar__contact">
                            <ul>
                                {/* <li><Link href="tel:+(02)587-898-250"><i className="fa-regular fa-phone-flip"></i>+(91) 88888 88888</Link></li>
                                <li><Link href="#"><i className="fa-solid fa-location-dot"></i>Bangalore, India - 560093</Link></li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-md-4">
                        <div className="bd-top__bar-social">
                            <ul><li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                <li><Link href="#"><i className="fa-brands fa-linkedin"></i></Link></li>
                                <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>

    );
};

export default HeaderTopTwo;