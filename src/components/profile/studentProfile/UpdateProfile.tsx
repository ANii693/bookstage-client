"use client";
import React, { useState } from "react";
import bgImg from "../../../../public/assets/img/user-bg/course-slider.png";
import thumb from "../../../../public/assets/img/icon/user-icon.png";
import Image from "next/image";
import RestPasswordForm from "@/form/RestPasswordForm";
import UserProfileUpdate from "@/form/UserProfileUpdate";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, header, setUpdate } = useGlobalContext();
  const [upload, setupload] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string>("");
  const handleSingleImgUpload = async (e: any) => {
    setupload(false);
    setUpdate(false);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_URL}`,
        formData
      );
      const imageUrl = response.data.data.url;
      if (response.data.success === true) {
        setupload(true);
        setUpdate(true);
      }
      setProfilePic(imageUrl);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleClearSingleImg = () => {
    setupload(false);
    setProfilePic("");
  };

  const handleUpdateProfile = () => {
    setUpdate(false)
    const profileUpdateInfo = {
      id: user?._id,
      name: user?.name,
      phone: user?.phone,
      gender: user?.gender,
      photo: profilePic,
    };

    axios
      .put(
        `${process.env.BASE_URL}user/update-user?email=${user?.email}`,
        profileUpdateInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          setupload(false);
           setUpdate(true)

          toast.success(`profile Picture Updated`);
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

  return (
    <>
      <div className="student-profile-enroll">
        <ul className="nav mb-50" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="profileA-tab"
              data-bs-toggle="tab"
              data-bs-target="#profileA"
              type="button"
              role="tab"
              aria-controls="profileA"
              aria-selected="true"
            >
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="password-tab"
              data-bs-toggle="tab"
              data-bs-target="#password"
              type="button"
              role="tab"
              aria-controls="password"
              aria-selected="false"
            >
              Password
            </button>
          </li>
        </ul>
        <div className="tab-content mt-30" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="profileA"
            role="tabpanel"
            aria-labelledby="profileA-tab"
          >
            <div className="student-profile-settings">
              <div className="student-profile-setting-img mb-40">
                <div
                  className="student-profile-setting-cover-img"
                  style={{ backgroundImage: `url(${bgImg.src})` }}
                ></div>
                <div className="student-profile-setting-author-img upload-profile-pic">
                  {upload === false && !user?.photo ? (
                    <Image
                      width={200}
                      height={200}
                      style={{ width: "auto", height: "auto" }}
                      src={user?.photo ? user?.photo : thumb}
                      alt="img not found"
                    />
                  ) : null}
                  {upload === false ? (
                    <>
                      {user?.photo ? (
                        <>
                          <Image
                            src={user?.photo}
                            alt="category Img"
                            width={200}
                            height={200}
                            style={{ width: "auto", height: "auto" }}
                          />
                          <input
                            type="file"
                            id="profileImage"
                            className="hidden"
                            accept="image/*"
                            onChange={handleSingleImgUpload}
                            required
                          />
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            id="profileImage"
                            className="hidden"
                            accept="image/*"
                            onChange={handleSingleImgUpload}
                            required
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <div className="img_upload_preview upload-profile-pic">
                      <Image
                        src={profilePic}
                        alt="category Img"
                        width={200}
                        height={200}
                        style={{ width: "auto", height: "auto" }}
                      />
                      <button
                        onClick={handleClearSingleImg}
                        className="update-close-btn"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>

                      <button
                        onClick={handleUpdateProfile}
                        type="submit"
                        className="update-close-btn ml-20"
                      >
                        Update Picture
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <UserProfileUpdate />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="password"
            role="tabpanel"
            aria-labelledby="password-tab"
          >
            <RestPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
