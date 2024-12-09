"use client";
import useGlobalContext from "@/hooks/use-context";
import React from "react";
import { useRouter } from "next/navigation";
const ProfileSidebar = () => {
  const { logout, user } = useGlobalContext();
  const router = useRouter();
  const handleAdminPannel = () => {
    router.push(`${process.env.ADMIN_URL}`);
  };

  return (
    <div className="col-xl-3 col-lg-4">
      <div className="student-profile-sidebar mb-30">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              <i className="fas fa-tachometer-alt-fast"></i>
              Dashboard
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              <i className="fas fa-user"></i> My Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="history-tab"
              data-bs-toggle="tab"
              data-bs-target="#history"
              type="button"
              role="tab"
              aria-controls="history"
              aria-selected="false"
            >
              <i className="fas fa-cart-plus"></i> Order Products
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="upload-documents-tab"
              data-bs-toggle="tab"
              data-bs-target="#upload-documents"
              type="button"
              role="tab"
              aria-controls="upload-documents"
              aria-selected="false"
            >
              <i className="fas fa-file-upload"></i> Upload Documents
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="wishlist-tab"
              data-bs-toggle="tab"
              data-bs-target="#wishlist"
              type="button"
              role="tab"
              aria-controls="wishlist"
              aria-selected="false"
            >
              <i className="fa-solid fa-money-check"></i> Payment History
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="reviews-tab"
              data-bs-toggle="tab"
              data-bs-target="#reviews"
              type="button"
              role="tab"
              aria-controls="reviews"
              aria-selected="false"
            >
              <i className="fas fa-star"></i> Reviews
            </button>
          </li>
          {/* <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="comments-tab"
              data-bs-toggle="tab"
              data-bs-target="#comments"
              type="button"
              role="tab"
              aria-controls="comments"
              aria-selected="false"
            >
              <i className="fa-solid fa-comment"></i> My Comments
            </button>
          </li> */}

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="setting-tab"
              data-bs-toggle="tab"
              data-bs-target="#setting"
              type="button"
              role="tab"
              aria-controls="setting"
              aria-selected="false"
            >
              <i className="fas fa-cog"></i> Settings
            </button>
          </li>
          {/* <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="cancel-tab"
              data-bs-toggle="tab"
              data-bs-target="#cancel"
              type="button"
              role="tab"
              aria-controls="cancel"
              aria-selected="false"
            >
              <i className="fas fa-cog"></i> Cancel Orders
            </button>
          </li> */}
          {user?.role === "admin" && (
            <li className="nav-item" role="presentation">
              <button onClick={handleAdminPannel} className="nav-link">
                <i className="fa-solid fa-lock"></i> Admin Pannel
              </button>
            </li>
          )}

          <li className="nav-item" role="presentation">
            <button
              onClick={logout}
              className="nav-link"
              id="logout-tab"
              data-bs-toggle="tab"
              data-bs-target="#logout"
              type="button"
              role="tab"
              aria-controls="logout"
              aria-selected="false"
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
