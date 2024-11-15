"use client"
import EmailIcon from "@/sheardComponent/elements/icons/email-icon";
import LocationIcon from "@/sheardComponent/elements/icons/location-icon";
import PhoneIcon from "@/sheardComponent/elements/icons/phone-icon";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import moment from "moment";
import useGlobalContext from "@/hooks/use-context";
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
} 

const ContactForm = () => {
  const {user} = useGlobalContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const message = data.message;

    const userInfo = {
      name,
      email,
      phone,
      message,
      date
    };


    const sendEmail = () => {
        const templateParams = {
            name: name,
            message: message,
            email: email,
        };
      
        emailjs
          .send(
            `${process.env.EMAIL_SERVICE_ID}`,
            `${process.env.EMAIL_TEMPLATE_ID}`,
            templateParams,
            `${process.env.EMAIL_PUBLIC_KEY}`
          )
          .then(
            function (response) {
              console.info("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
      };

    axios.post(`${process.env.BASE_URL}user-input/contact`,userInfo)
    .then((res)=>{
        if(res.data.message ==="success"){
            reset()
            sendEmail()
            toast.success(`Message Send Success`);
        }
        if(res.data.message ==="custom error"){
            toast.error(`Message Send Faield`);
        }
    })
  };

  return (
    <section className="bd-Contact__area pt-105">
      <div className="container">
        <div className="row g-0 justify-content-center">
          <div className="col-xxl-7 col-xl-7 col-lg-8 col-md-12">
            <div className="bd-contact__main-wrapper mb-70">
              <div className="bd-section__title-wrapper">
                <h2 className="bd-section__title mb-50">Get in Touch</h2>
              </div>
              <div className="bd-contact__form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="bd-single__form-input mb-20">
                        <input
                          type="text"
                          defaultValue={user?.name && user?.name}
                          placeholder="Name"
                          {...register("name", {
                            required: "name is required",
                          })}
                        />
                        {errors.name && <span>{errors.name.message}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="bd-single__form-input  mb-20">
                        <input defaultValue={user?.phone && user?.phone} type="text" placeholder="Phone" {...register("phone", {
                            required: "phone is required",
                          })} />
                          {errors.phone && <span>{errors.phone.message}</span>}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="bd-single__form-input  mb-20">
                        <input
                          type="text"
                          placeholder="Email"
                          defaultValue={user?.email && user?.email}
                          {...register("email", {
                            required: "Email or UserName is required",
                            pattern: {
                              value:
                                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                              message: "Invalid email format",
                            },
                          })}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="bd-single__form-input  mb-20">
                        <textarea
                          
                          id="message"
                          placeholder="Messages"
                          {...register("message", {
                            required: "message is required",
                          })}
                        />
                        {errors.message && <span>{errors.message.message}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="contact-btn">
                    <button type="submit" className="bd-fill__btn">
                      Submit Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-lg-4">
            <div className="bd__sidebar-wrapper mb-70">
              <div className="bd-sidebar__support">
                <div className="bd-sidebar__title">
                  <h4>Support Contact</h4>
                </div>
                <div className="bd-sidebar__content">
                  <div className="bd-contact__list">
                    <div className="bd-contact__item">
                      <div className="bd-contact__item-list">
                        <div className="bd-contact__icon">
                          <PhoneIcon />
                        </div>
                        <div className="bd-contact__content">
                          <div className="bd-contact__title">
                            <h4>Phone</h4>
                          </div>
                          <span>
                            Mobile :{" "}
                            <a href="">
                              <span>(+91) 88889 88888</span>
                            </a>
                          </span>
                          <span>
                            Mobile :{" "}
                            <a href="tel:(+8)422-655-793">
                              <span>(+91) 99999 99999</span>
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bd-contact__item">
                      <div className="bd-contact__item-list">
                        <div className="bd-contact__icon">
                          <EmailIcon />
                        </div>
                        <div className="bd-contact__content">
                          <div className="bd-contact__title">
                            <h4>Email</h4>
                          </div>
                          <span>
                            <a href="mailto:Info@example.com">
                              Info@example.com
                            </a>
                          </span>
                          <span>
                            <a href="mailto:Info@example.com">
                              Contact@example.com
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bd-contact__item">
                      <div className="bd-contact__item-list">
                        <div className="bd-contact__icon">
                          <LocationIcon />
                        </div>
                        <div className="bd-contact__content">
                          <div className="bd-contact__title">
                            <h4>Location</h4>
                          </div>
                          <p>
                            CMRIT, Bangalore <br />
                            Inida - 560093
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
