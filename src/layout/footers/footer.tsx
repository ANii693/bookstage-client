import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import footerLogo from "../../../public/assets/img/logo/footer-logo.png";
import support from "../../../public/assets/img/icon/support.png";
import discover from "../../../public/assets/img/icon/discover.png";
import masterCard from "../../../public/assets/img/icon/mastercard.png";
import paypal from "../../../public/assets/img/icon/paypal.png";
import visa from "../../../public/assets/img/icon/visa.png";
import axios from "axios";
import { CategoryType } from "@/interFace/api-interFace";
const FooterOne = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}setting/category`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <footer>
      <section className="bd-footer__area grey-bg pt-100 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="bd-footer__widget footer-col-1 mb-60">
                <div className="bd-footer__info">
                  <div className="bd-footer__logo">
                    <Link href="/">
                      <Image src={footerLogo} alt="footer-logo" />
                    </Link>
                  </div>
                  <p>
                    Sed perspiciatis unde omnis natus error voluptatem accusan
                    doloreqe laudantium totam aperiam eaque sipsa quae abillo
                    inventore
                  </p>
                  <div className="bd-footer__contact">
                    <span>
                      <Link href="mailto:Info@example.com">
                        <i className="fa-regular fa-envelope"></i>
                        Info@example.com{" "}
                      </Link>{" "}
                    </span>
                    <span>
                      <i className="fa-solid fa-location-dot"></i>Favicon, New
                      York, USA - 25423
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="bd-footer__widget footer-col-2 mb-60">
                <div className="bd-footer__widget-title">
                  <h4>Quick Links</h4>
                </div>
                <div className="bd-footer__link">
                  <ul>
                    <li>
                      <Link href="/about">About Our Company</Link>
                    </li>
                    <li>
                      <Link href="/wishlist">Wishlist</Link>
                    </li>
                    <li>
                      <Link href="/cart">Cart</Link>
                    </li>
                    <li>
                      <Link href="/shop">Flash Offers</Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">Terms & Condition</Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="bd-footer__widget footer-col-3 mb-60">
                <div className="bd-footer__widget-title">
                  <h4>Categories</h4>
                </div>
                <div className="bd-footer__link">
                  <ul>
                    {categories?.length ? (
                      <>
                        {categories?.map((item) => (
                          <li key={item?._id}>
                            <Link
                              className="text-capitalize"
                              href={`/shop/${item?.categoryName}`}
                            >
                              {item?.categoryName}
                            </Link>
                          </li>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="bd-footer__widget mb-60">
                <div className="bd-footer__widget-title">
                  <h4>Newsletter</h4>
                </div>
                <div className="bd-footer__subcribe p-relative mb-40">
                  <form action="#">
                    <input type="text" placeholder="Enter Your Email" />
                    <button className="bd-footer__s-btn">
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </button>
                  </form>
                </div>
                <div className="bd-footer__support-wrapper">
                  <div className="bd-fotter__support-icon">
                    <Image src={support} alt="support-img" />
                  </div>
                  <div className="bd-footer__support-inner">
                    <span>8:30 AM - 9:30 PM</span>
                    <h4>
                      <Link href="tel:+58569502352">+585 695 023 52 </Link>{" "}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bd-sub__fotter">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="bd-footer__copyright">
                <ul>
                  <li>All Rights Reserved</li>
                  <li>
                    Copyrighted by ©2023{" "}
                    <span>
                      <Link href="https://themeforest.net/user/bdevs/portfolio">
                        BDevs{" "}
                      </Link>{" "}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="bd-footer__payment">
                <ul>
                  <li>
                    <span>We Support</span>
                  </li>
                  <li>
                    <Link href="#">
                      <Image src={discover} alt="discover" />{" "}
                    </Link>{" "}
                  </li>
                  <li>
                    <Link href="#">
                      <Image src={masterCard} alt="mastercard" />{" "}
                    </Link>{" "}
                  </li>
                  <li>
                    <Link href="#">
                      <Image src={paypal} alt="paypal" />{" "}
                    </Link>{" "}
                  </li>
                  <li>
                    <Link href="#">
                      <Image src={visa} alt="visa" />{" "}
                    </Link>{" "}
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

export default FooterOne;
