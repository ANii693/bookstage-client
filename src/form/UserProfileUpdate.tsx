"use client";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import NiceSelectTwo from "@/utils/NiceSelectTwo";
import { GenderData } from "@/data/nice-select-data";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
}

const UserProfileUpdate = () => {
  const { user, header, setUpdate } = useGlobalContext();
  const [Gender, setGender] = useState<string>("");
  const router = useRouter();
  const parts = user?.name.split(" ");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // update profile info

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setUpdate(false)
    const name = `${data.firstName} ${data.lastName}`;
    const phone = data.phone;
    const gender = Gender;
    const userUpdateInfo = {
      id: user?._id,
      name,
      phone,
      gender,
      photo: user?.photo,
    };
    axios
      .put(
        `${process.env.BASE_URL}user/update-user?email=${user?.email}`,
        userUpdateInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          setUpdate(true)
          router.push("/profile");
          toast.success(`profile Updated`);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          console.error("Unauthorized access");
        } else {
          console.error("Unauthorized access");
        }
      });
  };

  const selectHandler = () => {};

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="contact-from-input mb-20">
              <label htmlFor="FirstName">First Name</label>
              <input
                id="FirstName"
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                defaultValue={parts?.length ? parts[0] : ""}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-from-input mb-20">
              <label htmlFor="LastName">Last Name</label>
              <input
                id="LastName"
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                defaultValue={parts?.length ? parts[1] : ""}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="contact-from-input mb-20">
              <label htmlFor="Email">Email</label>
              <input
                id="Email"
                type="email"
                placeholder="Email"
                readOnly
                defaultValue={user?.email}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-from-input mb-20">
              <label htmlFor="Phone">Phone </label>
              <input
                id="Phone"
                type="text"
                placeholder="Phone"
                {...register("phone")}
                defaultValue={user?.phone}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-from-input mb-20">
              <label htmlFor="Occupation"> Select Gender </label>
    
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

          <div className="col-sm-12">
            <div className="cont-btn mb-20  mt-10">
              <button type="submit" className="bd-bn__btn-1">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserProfileUpdate;
