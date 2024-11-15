"use client";
import Preloader from "@/components/common/Preloader";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// Define your form data interface
interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading } = useGlobalContext();
  const [loginError, setloginError] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);

    const email = data.email;
    const password = data.password;

    const userInfo = {
      email,
      password,
    };

    axios
      .post(`${process.env.BASE_URL}user/login`, userInfo)

      .then((res) => {
        switch (res.data.message) {
          case "Login Successful":
            const token = res.data.data;
            localStorage.setItem("accessToken", token);
            setLoading(false);
            router.push("/");
            toast.success(`Login Successfull`);
            break;
          case "password not Match":
            setLoading(false);
            setloginError("Password Not Match");
            break;
          case "user not Valid":
            setLoading(false);
            setloginError("user not Valid");
            break;
          case "custome error":
            setLoading(false);
            setloginError("Inter Valid Into");
            break;
          default:
            // Handle any other response messages if needed.
            setLoading(false);
            break;
        }
      })
      .catch((error) => console.log(error));
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <div className="bd-login__area pt-115 pb-130">
        <div className="container small-container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="Login-form-wrapper">
                <div className="bd-postbox__contact">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-xxl-12">
                        <div className="bd-postbox__singel-input">
                          <input
                            type="text"
                            placeholder="Enter Your Email"
                            defaultValue="orgado@user.com"
                            {...register("email", {
                              required: "Email or UserName is required",
                              pattern: {
                                value:
                                  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                                message: "Invalid email format",
                              },
                            })}
                          />
                          {errors.email && (
                            <span className="error-message">
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-xxl-12">
                        <div className="bd-password-box d-flex justify-content-between">
                          <input
                            type={showPassword ? "text" : "password"}
                            defaultValue="111111"
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
                            <span className="error-message">
                              {errors.password.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="signup-action">
                        <div className="signup-action-check">
                          <input
                            className="e-check-input"
                            type="checkbox"
                            id="sing-up"
                            {...register("rememberMe")}
                          />
                          <label className="sign-check" htmlFor="sing-up">
                            <span>Remember me</span>
                          </label>
                        </div>
                      </div>
                      <span className="error-message">
                        {loginError && loginError}
                      </span>
                      <div className="bd-sigin__action-button mb-20">
                        <button className="bd-fill__btn w-100" type="submit">
                          Login now
                        </button>
                      </div>
                      <div className="bd-registered__wrapper">
                        <div className="not-register">
                          <span>Not registered?</span>
                          <span>
                            <Link href="/register">Sign up</Link>
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
    </>
  );
};

export default LoginForm;
