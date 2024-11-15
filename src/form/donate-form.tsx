"use client";
import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Preloader from "@/components/common/Preloader";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  numberOfToys: number;
  donationDetails: string;
}

const DonationForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    setSubmitError("");
    setSubmitSuccess(false);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('numberOfToys', data.numberOfToys.toString());
    formData.append('donationDetails', data.donationDetails);
    formData.append('to', 'donations@example.com');

    selectedFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    axios
      .post(`${process.env.BASE_URL}email/send-donation-request`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setSubmitSuccess(true);
          reset();
          setSelectedFiles([]);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } else {
          setSubmitError("Failed to send donation request. Please try again.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setSubmitError("An error occurred. Please try again.");
        console.error(error);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="bd-donation__area pt-115 pb-130">
      <div className="container small-container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="bd-section__title text-center mb-55">Donation Form</h2>
            <div className="donation-form-wrapper">
              <div className="bd-postbox__contact">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-xxl-12">
                      <div className="bd-postbox__singel-input">
                        <input
                          type="text"
                          placeholder="Name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                        />
                        {errors.name && (
                          <span className="error-message">{errors.name.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-12">
                      <div className="bd-postbox__singel-input">
                        <input
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
                        {errors.email && (
                          <span className="error-message">{errors.email.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-12">
                      <div className="bd-postbox__singel-input">
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          {...register("phoneNumber", {
                            required: "Phone number is required",
                          })}
                        />
                        {errors.phoneNumber && (
                          <span className="error-message">{errors.phoneNumber.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-12">
                      <div className="bd-postbox__singel-input">
                        <input
                          type="number"
                          placeholder="Number of Toys to Donate"
                          {...register("numberOfToys", {
                            required: "Number of toys is required",
                            min: { value: 1, message: "Please enter a number greater than 0" }
                          })}
                        />
                        {errors.numberOfToys && (
                          <span className="error-message">{errors.numberOfToys.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-12">
                      <div className="bd-postbox__singel-input">
                        <textarea
                          placeholder="Donation details (e.g., types of toys, condition)"
                          {...register("donationDetails", {
                            required: "Donation details are required",
                          })}
                        ></textarea>
                        {errors.donationDetails && (
                          <span className="error-message">{errors.donationDetails.message}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-12 mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attach Photos of Toys (optional)
                      </label>
                      <div className="flex items-center">
                        <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Choose Files
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                          ref={fileInputRef}
                        />
                        <span className="ml-3 text-sm text-gray-500">
                          {selectedFiles.length > 0 ? `  ${selectedFiles.length} file(s) selected` : "  No file chosen"}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedFiles.map((file, index) => (
                          <span key={index} className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            {file.name}
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="ml-2 inline-flex items-center justify-center w-4 h-4 text-red-400 hover:text-red-500"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {submitError && <span className="error-message">{submitError}</span>}
                    {submitSuccess && (
                      <span className="success-message">Donation request sent successfully!</span>
                    )}

                    <div className="bd-sigin__action-button mb-20">
                      <button className="bd-fill__btn w-100" type="submit">
                        Submit Request
                      </button>
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

export default DonationForm;