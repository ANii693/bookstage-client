import React from "react";
import Link from "next/link";
import ContactForm from "../contact/ContactForm";
import RefundForm from "./RefundForm";

const PrivacyPolicyMain = () => {
  return (
    <>
      <section className="terms_conditions_section section_space_lg pt-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ul
                className="nav tabs_nav_boxed unordered_list_block mb-60"
                role="tablist"
              >
                <li role="presentation">
                  <button
                    className="active"
                    data-bs-toggle="tab"
                    data-bs-target="#tab_privacy_policy"
                    type="button"
                    role="tab"
                    aria-selected="false"
                  >
                    <i className="fas fa-circle"></i>
                    <span>Policy & Privacy</span>
                  </button>
                </li>
                <li role="presentation">
                  <button
                    data-bs-toggle="tab"
                    data-bs-target="#tab_terms_conditions"
                    type="button"
                    role="tab"
                    aria-selected="true"
                  >
                    <i className="fas fa-circle"></i>
                    <span>Terms & Conditions</span>
                  </button>
                </li>

                <li role="presentation">
                  <button
                    data-bs-toggle="tab"
                    data-bs-target="#product_refund_policy"
                    type="button"
                    role="tab"
                    aria-selected="true"
                  >
                    <i className="fas fa-circle"></i>
                    <span> Refund Policy</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-lg-9">
              <div className="tab-content mb-60">
                <div
                  className="tab-pane fade show active"
                  id="tab_privacy_policy"
                  role="tabpanel"
                >
                  <div className="terms_conditions_content">
                    <h3 className="warpper_title">Privacy Policy Agreement</h3>
                    <p>
                      At <strong>Orgado</strong>, we value your privacy and are committed to
                      protecting your personal information. This Privacy Policy
                      outlines how we collect, use, and safeguard your data when
                      you interact with our platform.
                    </p>

                    <h4 className="info_title">Why We Collect Data</h4>
                    <p>
                      As a provider of the
                      {` "<strong>Orgado</strong> -e commerce "`} you may collect and{" "}
                      <Link className="link" href="/faq">
                        Google require website
                      </Link>{" "}
                    </p>

                    <span className="list_item_text">
                      <strong>1. Personal Information:</strong> When you create
                      an account or make a purchase, we may collect your name,
                      email address, shipping address, and payment details to
                      provide you with our services.
                    </span>
                    <br />
                    <span className="list_item_text">
                      <strong>2. Browsing Data:</strong> We may collect
                      information about your browsing behavior on our website to
                      improve our product recommendations and enhance your
                      shopping experience.
                    </span>
                    <br />
                    <span className="list_item_text">
                      <strong>3. Cookies and Tracking:</strong> We use cookies
                      and tracking technologies to gather data about your
                      interactions with our website, such as pages visited and
                      products viewed. This information helps us tailor our
                      offerings to your preferences and interests.
                    </span>
                    <br />
                    <span className="list_item_text">
                      <strong>4. Third-Party Services:</strong> Some popular
                      third-party services may require us to post Privacy Policy
                      agreements on our website to comply with their policies
                      and regulations.
                    </span>

                    <h4 className="info_title">
                      Questions, comments, or report of incidents
                    </h4>
                    <p className="mb-1">
                      You may direct questions, comments or reports to:
                    </p>
                    <p>
                      <Link className="link" href="mailto:howdy@paradox.com">
                        <strong>Orgado</strong>admin@gmail.com
                      </Link>
                    </p>
                    <h4 className="info_title">
                      Revisions to this privacy policy without notice
                    </h4>
                    <p className="mb-0">
                      This Privacy Policy is dynamic. It will continually
                      change. You may not assume that it remains the same and
                      you agree to check the policy each time you visit the site
                      for changes. Unless, in the sole opinion of the website,
                      this policy changes so drastically as to suggest a posted
                      notification on the site or via email, you will receive no
                      notification of changes to this Privacy Policy nor, under
                      any circumstances, does this site promise notification.
                      Your continued use of this site always evidences your
                      acceptance of the terms this Privacy Policy or any
                      modifications.
                    </p>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab_terms_conditions"
                  role="tabpanel"
                >
                  <div className="terms_conditions_content">
                    <h3 className="warpper_title">
                      Terms and Conditions Agreement
                    </h3>
                    <p>
                      A terms and conditions agreement outlines the website
                      administrator`’`s rules regarding user behaviour and
                      provides information about the actions the website
                      administrator can and will perform. Essentially, your
                      terms and conditions text is a{" "}
                      <Link className="link" href="/contact">
                        contract between your website and its users
                      </Link>
                      . In the event of a legal dispute, arbitrators will look
                      at it to determine whether each party acted within their
                      rights.
                    </p>
                    <p>
                      Condition is not a new concept. Humans have always desired
                      privacy in their social as well as private lives. But the
                      idea of privacy as a human right is a relatively modern
                      phenomenon.
                    </p>
                    <h4 className="info_title">
                      Here are some of the main reasons:
                    </h4>
                    <ul className="icon_list  unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          <strong>1. Improved Shopping Experience:</strong> We
                          use your information to enhance your shopping
                          experience, including personalized product
                          recommendations and seamless checkout processes.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          <strong>2. Order Processing:</strong> We collect data
                          to process and fulfill your orders, including shipping
                          and delivery.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          <strong>3. Marketing and Communication:</strong> With
                          your consent, we may send you promotional offers and
                          updates via email or SMS.
                        </span>
                      </li>
                    </ul>
                    <h4 className="info_title">What We Collect</h4>
                    <p>
                      When you use our website, we may collect information such
                      as your name, email address, shipping address, and payment
                      details. This information is used solely for the purpose
                      of providing our services to you.
                      <Link className="link" href="/privacy-policy">
                        what clauses to include in your terms and conditions
                      </Link>
                      , but this clause essentially limits what customers can
                      hold you liable for.
                    </p>

                    <h4 className="info_title">Our Liability Limitations</h4>
                    <p>
                      At [Your E-commerce Website], we are committed to
                      providing you with a seamless shopping experience.
                      However, {`it's`} essential to understand our limitations
                      and responsibilities. Please read the following carefully:
                    </p>
                    <ul className="icon_list unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          <strong>1. Product Information Accuracy:</strong>{" "}
                          While we strive for accuracy, there may be occasional
                          inaccuracies or errors in product descriptions,
                          pricing, or availability. We reserve the right to
                          correct such errors and may cancel orders affected by
                          inaccuracies.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          <strong>2. Customer Satisfaction:</strong> We aim to
                          ensure your enjoyment when shopping with us. If you
                          have any concerns or are dissatisfied with your
                          purchase, please contact our customer support team,
                          and we will do our best to address your issues.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          <strong>3. Product and Website Availability:</strong>{" "}
                          While we strive to maintain the availability of our
                          products and website, there may be instances of
                          temporary downtime due to maintenance or technical
                          issues. We apologize for any inconvenience this may
                          cause and work to resolve such issues promptly.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          <strong>4. Security and Product Integrity:</strong> We
                          take precautions to protect our website from viruses
                          and spyware. However, we cannot guarantee absolute
                          security. We recommend using up-to-date antivirus
                          software and taking precautions when downloading files
                          or links from our platform.
                        </span>
                      </li>
                    </ul>
                    <p>
                      Please note that by using our website and making
                      purchases, you acknowledge and accept these limitations
                      and policies.
                    </p>

                    <h4 className="info_title">
                      To Outline Policies and Avoid Abusive Behavior
                    </h4>
                    <p className="mb-1">
                      You may direct questions, comments or reports to:
                    </p>
                    <p>
                      <Link
                        className="author_mail"
                        href="mailto:howdy@paradox.com"
                      >
                        howdy@eduman.com
                      </Link>
                    </p>
                    <h4 className="info_title">
                      Revisions to this Teams & Condition without Notice
                    </h4>
                    <p className="mb-0">
                      This Privacy Policy is dynamic. It will continually
                      change. You may not assume that it remains the same and
                      you agree to check the policy each time you visit the site
                      for changes. Unless, in the sole opinion of the website,
                      this policy changes so drastically as to suggest a posted
                      notification on the site or via email, you will receive no
                      notification of changes to this Privacy Policy nor, under
                      any circumstances, does this site promise notification.
                      Your continued use of this site always evidences your
                      acceptance of the terms this Privacy Policy or any
                      modifications.
                    </p>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="product_refund_policy"
                  role="tabpanel"
                >
                  <div className="terms_conditions_content">
                    <h3 className="warpper_title">Product Refund Policy</h3>
                    <p>
                      At <strong>Orgado</strong>, we strive to provide you with
                      high-quality products and an exceptional shopping
                      experience. However, we understand that there may be
                      instances where you need to return a product. We want to
                      make the process as smooth as possible for you, so please
                      take a moment to review our product refund policy.
                    </p>

                    <h4 className="info_title">Eligibility for Refund:</h4>
                    <ul className="icon_list  unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          To be eligible for a refund, the product must be in
                          its original condition, unused, and in its original
                          packaging.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          Returns must be initiated within <strong>[X]</strong>{" "}
                          days of receiving the product.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          Personalized or customized items may not be eligible
                          for a refund unless they arrive damaged or with a
                          defect.
                        </span>
                      </li>
                    </ul>
                    <h4 className="info_title">Initiating a Return:</h4>
                    <ul className="icon_list  unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          To initiate a return, please contact our customer
                          support team at [Customer Support Email] or [Customer
                          Support Phone Number].
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          Our customer support team will guide you through the
                          return process and provide you with a Return
                          Merchandise Authorization (RMA) number if required.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          Personalized or customized items may not be eligible
                          for a refund unless they arrive damaged or with a
                          defect.
                        </span>
                      </li>
                    </ul>

                    <h4 className="info_title">Return Shipping:</h4>
                    <ul className="icon_list  unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          Customers are responsible for the cost of return
                          shipping unless the product arrived damaged or with a
                          defect.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          We recommend using a trackable shipping service to
                          ensure that your return reaches us safely.
                        </span>
                      </li>
                    </ul>

                    <h4 className="info_title">Inspection and Processing:</h4>
                    <ul className="icon_list  unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          Once we receive your returned product, our team will
                          inspect it to ensure it meets our eligibility
                          criteria.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          If the product qualifies for a refund, we will process
                          the refund within [X] business days.
                        </span>
                      </li>
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          Refunds will be issued to the original payment method
                          used for the purchase.
                        </span>
                      </li>
                    </ul>

                    <h4 className="info_title">Refund Amount:</h4>
                    <ul className="icon_list  unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          The refund amount will include the cost of the product
                          and any applicable taxes.
                        </span>
                      </li>

                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          Shipping fees are non-refundable unless the return is
                          due to a shipping error on our part.
                        </span>
                      </li>
                    </ul>

                    <h4 className="info_title">
                      {" "}
                      Damaged or Defective Products:
                    </h4>
                    <ul className="icon_list  unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          If you receive a damaged or defective product, please
                          contact us immediately.
                        </span>
                      </li>

                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          We may request photos or other documentation to assess
                          the issue and provide a replacement or refund.
                        </span>
                      </li>
                    </ul>

                    <h4 className="info_title"> Exchanges:</h4>
                    <ul className="icon_list  unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          We do not offer direct exchanges. If you need a
                          different product, please return the original item
                          following our refund policy guidelines and place a new
                          order.
                        </span>
                      </li>
                    </ul>

                    <h4 className="info_title"> Non-Refundable Items:</h4>
                    <ul className="icon_list  unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          Gift cards and downloadable software or digital
                          products are non-refundable.
                        </span>
                      </li>
                    </ul>
                    <h4 className="info_title"> Changes to this Policy:</h4>
                    <ul className="icon_list  unordered_list_block">
                      <li>
                        <span className="list_item_icon">
                          <i className="fas fa-circle"></i>
                        </span>
                        <span className="list_item_text">
                          <strong>Orgado</strong> reserves the right to update or
                          modify this refund policy at any time without prior
                          notice. Any changes will be effective immediately upon
                          posting on our website.
                        </span>
                      </li>
                    </ul>
                    <p>
                      If you have any questions or concerns regarding our
                      product refund policy, please do not hesitate to contact
                      our customer support team. We are here to assist you and
                      ensure that you have a positive shopping experience with
                      us. 
                      <br />
                      Thank you for choosing <strong>Orgado</strong>!
                    </p>
                  </div>
                  <RefundForm/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <ContactForm/> */}
    </>
  );
};

export default PrivacyPolicyMain;
