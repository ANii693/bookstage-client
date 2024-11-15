import React from 'react';

const ContactMap = () => {
    return (
        <div className="bd-google__map-area pb-125">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-10 col-xl-11">
                    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d622577.1705695821!2d77.35073192921036!3d12.953847715324511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670a75d07b1%3A0x40923d48e5a6b1de!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1690038431983!5m2!1sen!2sus"
      width="600"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>

                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24187.924717451475!2d-74.17913762136895!3d40.72922934784896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1655544592973!5m2!1sen!2sbd"></iframe> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactMap;