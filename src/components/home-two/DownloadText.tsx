import React from 'react';
import thumb1 from "../../../public/assets/img/trending/app/app-store-01.png"
import thumb2 from "../../../public/assets/img/trending/app/app-store-02.png"
import Image from 'next/image';
import Link from 'next/link';
const DownloadText = () => {
    return (
        <div className="col-xl-12 col-lg-12">
            <div className="bd-trending__app-wrapper text-center mb-30">
                <div className="bd-trending__app-title">
                    <h5>Download the App</h5>
                    <span>Make your life easier</span>
                </div>
                <div className="bd-trending__app-image">
                    <Link href=""><Image src={thumb1} alt="app-store" /></Link>
                    <Link href=""><Image src={thumb2} alt="app-store" /></Link>
                </div>
            </div>
        </div>
    );
};

export default DownloadText;