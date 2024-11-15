import React from 'react';

const FaqForm = () => {
    return (
        <div className="bd__faq-from-area pb-100">
            <div className="container small-container">
                <div className="row">
                    <div className="col-12">
                        <div className="bd-section__title-wrapper text-center mb-55">
                            <h2 className="bd-section__title custome-title-size mb-30">Still stuck ask directly</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="bd-postbox__contact mb-30">
                            <form action="#">
                                <div className="row">
                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                        <div className="bd-postbox__singel-input">
                                            <input type="text" placeholder="Your Name"/>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                                        <div className="bd-postbox__singel-input">
                                            <input type="email" placeholder="Your Email"/>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6">
                                        <div className="bd-postbox__singel-input">
                                            <input type="text" placeholder="Website"/>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6">
                                        <div className="bd-postbox__singel-input">
                                            <input type="text" placeholder="subject"/>
                                        </div>
                                    </div>
                                    <div className="col-xxl-12">
                                        <div className="bd-postbox__singel-input">
                                            <textarea placeholder="Enter your comment ..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-12">
                                    <div className="bd-postbox__btn">
                                        <button type="submit" className="bd-fill__btn">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqForm;