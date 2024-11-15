import Link from "next/link";
import React from "react";
import footerlogo from "../../../public/assets/img/logo/footer-logo.png";
import Image from "next/image";
const FooterThree = () => {
  return (
    <footer>
      <div className="bd-footer__area grey-bg pt-100 pb-60">
        <div className="bd-footer__style-2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="bd-footer__widget text-center mb-40">
                  <div className="bd-footer__logo">
                    <Link href="/">
                      <Image src={footerlogo} alt="footer-logo" />
                    </Link>
                  </div>
                </div>
                <div className="bd-footer__widget text-center mb-40">
                  <div className="bd-footer__link">
                    <ul>
                      <li>
                        <Link href="/about">About Our Company</Link>
                      </li>
                      <li>
                        <Link href="/shop">Latest Products</Link>
                      </li>
                      <li>
                        <Link href="/checkout">Payment Type</Link>
                      </li>
                      <li>
                        <Link href="/about">Awards Winnings</Link>
                      </li>
                      <li>
                        <Link href="/about">World Media Partner</Link>
                      </li>
                      <li>
                        <Link href="/shop">Flash Offers</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bd-footer__widget text-center mb-40">
                  <div className="bd-footer__social">
                    <Link href="https://www.facebook.com/" target="_blank">
                      <i className="fab fa-facebook-f"></i>
                    </Link>

                    <Link href="https://twitter.com/?lang=en" title="Twitter">
                      <i className="fab fa-twitter"></i>
                    </Link>

                    <Link
                      href="https://www.linkedin.com/"
                      title="Linkedin"
                      target="_blank"
                    >
                      <i className="fab fa-linkedin"></i>
                    </Link>

                    <Link
                      href="https://www.instagram.com/"
                      target="_blank"
                      title="Instagram"
                    >
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bd-sub__fotter">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="bd-footer__copyright text-center">
                <ul>
                  <li>All Rights Reserved</li>
                  <li>
                    Copyrighted by ©2023{" "}
                    <span>
                      <Link href="https://themeforest.net/user/bdevs/portfolio">
                        BDevs
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterThree;
