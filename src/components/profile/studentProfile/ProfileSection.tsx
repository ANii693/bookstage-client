"use client";
import React from "react";
import Image from "next/image";
import ProfileSidebar from "./ProfileSidebar";
import DashboardCounter from "./DashboardCounter";
import DefaultDashboard from "./DefaultDashboard";
import MyProfile from "./MyProfile";
import thumb from "../../../../public/assets/img/icon/user-icon.png";
import OrderHistory from "./OrderHistory";
import UpdateProfile from "./UpdateProfile";
import useGlobalContext from "@/hooks/use-context";
import UserReviews from "./UserReviews";
import UserComments from "./UserComments";
import PaymentInfo from "./PaymentInfo";
import CancelOrderTrack from "./CancelOrderTrack";
import DocumentUploadForm from "./DocumentUploadForm";
const ProfileSection = () => {
  const { user } = useGlobalContext();

  return (
    <div className="course-details-area pt-120 pb-100">
      <div className="container">
        <div className="student-profile-author pb-30">
          <div className="student-profile-author-img">
            {user?.photo ? (
              <Image
                src={user?.photo}
                alt="user image"
                width={120}
                height={120}
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              <Image
                src={thumb}
                style={{ width: "100%", height: "auto" }}
                alt="img not found"
              />
            )}
          </div>
          <div className="student-profile-author-text">
            <span>Hello,</span>
            <h3 className="student-profile-author-name text-capitalize"> {user?.name} </h3>
          </div>
        </div>
        <div className="row">
          <ProfileSidebar />
          <div className="col-xl-9 col-lg-8">
            <div className="student-profile-content">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h4 className="mb-25">Dashboard</h4>
                  <div className="student-profile-content-fact">
                    <DashboardCounter />
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="mb-25">My Recent Purches Products</h4>

                        <DefaultDashboard />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <h4 className="mb-25">My Profile</h4>
                  <MyProfile />
                </div>



                <div
                  className="tab-pane fade"
                  id="wishlist"
                  role="tabpanel"
                  aria-labelledby="wishlist-tab"
                >
                  <h4 className="mb-25">Payment Info</h4>
                  <div className="student-profile-wishlist">
                    <div className="row">
                      <PaymentInfo />
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="reviews"
                  role="tabpanel"
                  aria-labelledby="reviews-tab"
                >
                  <h4 className="mb-25">Reviews</h4>
                  <UserReviews />
                </div>

                <div
                  className="tab-pane fade"
                  id="comments"
                  role="tabpanel"
                  aria-labelledby="comments-tab"
                >
                  <h4 className="mb-25">Comments</h4>
                  <UserComments />
                </div>

                <div
                  className="tab-pane fade"
                  id="history"
                  role="tabpanel"
                  aria-labelledby="history-tab"
                >
                  <h4 className="mb-25">Order History</h4>
                  <OrderHistory />
                </div>
                <div
                  className="tab-pane fade"
                  id="upload-documents"
                  role="tabpanel"
                  aria-labelledby="upload-documents-tab"
                >
                  <h4 className="mb-25">Upload Documents</h4>
                  <DocumentUploadForm />
                </div>
                <div
                  className="tab-pane fade"
                  id="cancel"
                  role="tabpanel"
                  aria-labelledby="cancel-tab"
                >
                  <h4 className="mb-25">Cancel Orders</h4>
                  <CancelOrderTrack />
                </div>

                <div
                  className="tab-pane fade"
                  id="setting"
                  role="tabpanel"
                  aria-labelledby="setting-tab"
                >
                  <h4 className="mb-25">Settings</h4>
                  <UpdateProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
