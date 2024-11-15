"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import moment from "moment";
import Preloader from "@/components/common/Preloader";
import NiceSelectTwo from "@/utils/NiceSelectTwo";
import { GenderData } from "@/data/nice-select-data";
// Define  form data interface
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  phone: string;
  gender: string;
}

const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [loadings, setloadings] = useState<boolean>(false);
  const [Gender, setGender] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [registerError, setregisterError] = useState<string>("");
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setloadings(true);

    const name = `${data.firstName} ${data.lastName}`;
    const email = data.email;
    const password = data.password;
    const role = "user";
    const phone = data.phone;
    const gender = Gender;
    const userInfo = {
      name,
      email,
      password,
      role,
      phone,
      date,
      photo: "",
      gender,
    };

    axios
      .post(`${process.env.BASE_URL}user/register`, userInfo)
      .then((res) => {
        switch (res.data.message) {
          case "success":
            setloadings(false);
            router.push("/login");
            break;
          case "custome error":
            setloadings(false);
            setregisterError("Enter Valid Info");
            break;
          case "User Is Alreay Exist":
            setloadings(false);
            setregisterError("User Is Already Exist");
            break;
          default:
            setloadings(false);
            // Handle any other response messages if needed.
            break;
        }
      })
      .catch((error) => console.log(error));
  };

  if (loadings) {
    return <Preloader />;
  }

  const selectHandler = () => {};

  return (
    <div className="bd-register__area pt-115 pb-130">
      <div className="container small-container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="signup-form-wrapper">
              <div className="bd-postbox__contact">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                      <div className="bd-postbox__singel-input">
                        <input
                          type="text"
                          placeholder="First Name"
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                        />
                        {errors.firstName && (
                          <span className="error-message">{errors.firstName.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                      <div className="bd-postbox__singel-input">
                        <input
                          type="text"
                          placeholder="Last Name"
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                        />
                        {errors.lastName && (
                          <span className="error-message">{errors.lastName.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                      <div className="bd-postbox__singel-input">
                        <input
                          id="userEmail"
                          type="email"
                          placeholder="Email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                      <div className="bd-postbox__singel-input">
                        <input
                          id="userEmail"
                          type="text"
                          placeholder="Phone Number"
                          {...register("phone", {
                            required: "phone is required",
                            minLength: 10,
                          })}
                        />
                        {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                      </div>
                    </div>

                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                      <div className="bd-password-box d-flex justify-content-between">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password (at least 6 characters)"
                          {...register("password", {
                            required: "Password is required",
                            minLength: 6,
                          })}
                        />
                        <span className="input-icon">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-toggle-btn"
                          >
                            <i
                              className={
                                showPassword
                                  ? "fa-solid fa-eye"
                                  : "fa-regular fa-eye-slash"
                              }
                            ></i>
                          </button>
                        </span>
                        {errors.password && (
                          <span className="error-message">{errors.password.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-xxl-6 col-xl-6 col-lg-6">
                      <div className="bd-postbox__singel-input">
                        <NiceSelectTwo
                          options={GenderData}
                          defaultCurrent={0}
                          onChange={selectHandler}
                          name=""
                          setapiEndPoint={setGender}
                          className="gender-select"
                        />
                      </div>
                    </div>

                    <div className="signup-action">
                      <div className="signup-action-check">
                        <input
                          className="e-check-input"
                          type="checkbox"
                          id="sing-up"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <label className="sign-check" htmlFor="sing-up">
                          <span>
                            Accept the terms and{" "}
                            <Link href="/privacy-policy">Privacy Policy</Link>
                          </span>
                        </label>
                      </div>
                      {errors.acceptTerms && (
                        <span className="error-message">{errors.acceptTerms.message}</span>
                      )}
                    </div>

                    <span>{registerError && registerError}</span>

                    <div className="bd-sigin__action-button mb-20">
                      <button
                        disabled={!acceptTerms}
                        className="bd-fill__btn w-100"
                        type="submit"
                      >
                        Register now
                      </button>
                    </div>
                    <div className="bd-registered__wrapper">
                      <div className="not-register">
                        <span>Already Have an Account? </span>
                        <span>
                          <Link href="/login">Log In</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
