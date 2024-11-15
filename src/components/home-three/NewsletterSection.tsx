import React from 'react';

const NewsletterSection = () => {
    return (
        <section className="bd-subcribe__area grey-bg pt-100 pb-75">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="bd-section__title-wrapper text-center mb-35">
                            <div className="bd-sm__section-title mb-20">
                                <h3>You May Browse</h3>
                            </div>
                            <div className="bd-subcribe__text">
                                <p>Join our newsletter and get 10% off your first purchase! and get update!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-30">
                    <div className="col-xl-8">
                        <div className="bd-subcribe__filter p-relative">
                            <form action="#">
                                <input type="text" placeholder="Enter your email address"/>
                                    <button>Subscribe Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;