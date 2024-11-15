import Link from "next/link";
import React from "react";

const ErrorMain = () => {
  return (
    <>
      <section className="bd-error__area pt-90 pb-130">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="bd-error__page-content text-center">
                <div className="bd-error__number">
                  <h2>404</h2>
                </div>
                <div className="bd-error__text">
                  <h3>Opps! Page Not found</h3>
                  <p>Sorry mate … Something is Wrong</p>
                </div>
                <Link className="bd-error__btn" href="/">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorMain;
