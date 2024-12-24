"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useGlobalContext from "@/hooks/use-context";
import { PaymentInfoType, Product, SubmissionInfoType } from "@/interFace/interFace";
import { ChangeEvent, FormEvent, DragEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

interface FormData {
  email: string;
  eventId: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

const OrderTrackModal: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    eventId: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { dynamicId, eventDynamicId, user } = useGlobalContext();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType[]>([]);
  const [productInfo, setProductInfo] = useState<SubmissionInfoType | null>(null);

  useEffect(() => {
    // Check if eventDynamicId is valid (i.e., not null or undefined)
    if (eventDynamicId) {
      axios
        .get(`${process.env.BASE_URL}submission/list/${eventDynamicId}`)
        .then((res) => {
          setProductInfo(res.data);
          console.log(productInfo)
        })
        .catch((e) => {
          toast.error("Error fetching data: " + e.message, {
            position: "top-right",
            autoClose: 5000,
          });
        });
    }
  }, [eventDynamicId]); // This effect will trigger every time eventDynamicId changes

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addFiles = (files: File[]) => {
    const validFiles = files.filter((file) => file.size <= 50 * 1024 * 1024);
    if (validFiles.length !== files.length) {
      toast.warn("Some files were too large and not added (max 50MB).");
    }
    setSelectedFiles((prev) =>
      [...prev, ...validFiles].map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("video/") ? URL.createObjectURL(file) : undefined,
        })
      )
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const useremail = user?.email || "";
  const removeFile = (index: number) =>
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("email", useremail);
    submissionData.append("eventId", eventDynamicId);
    selectedFiles.forEach((file, index) => {
      submissionData.append(`files[${index}]`, file);
    });
    for (let [key, value] of Array.from(submissionData.entries())) {
      console.log(key, value);
    }
    try {
      const response = await axios.post(`${process.env.BASE_URL}submission/event`, submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Form submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
        });

        // Reset form and files after submission
        setFormData({
          email: useremail,
          eventId: eventDynamicId,
        });
        setSelectedFiles([]);
      }
    } catch (error) {
      toast.error("Error submitting form: " + (error as Error).message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const getFileIcon = (file: File) =>
    file.type.startsWith("video/") ? (
      <span>🎥</span>
    ) : (
      <span>📄</span>
    );

  return (
    <>
      <ToastContainer />
      <div
        className="product__modal-sm modal fade"
        id="orderTrackModal"
        role="dialog"
        aria-hidden="true"
        aria-labelledby="Event Submission"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Payment Info */}
              <div className="modal-header">
                <h5 className="modal-title">Event Submission Form</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                {productInfo && (
                  <>

                    <p>Event: {productInfo.eventname}</p>
                    <Link href={`/shop-details/${productInfo.eventUserId}`}>
                      <Image
                        src={productInfo.eventimg || ""}
                        width={200}
                        height={200}
                        style={{
                          width: "auto",
                          height: "auto",
                        }}
                        alt="Product Image"
                      />
                    </Link>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Documents and Videos (Max: 50MB each)
                  </label>
                  <div
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${isDragging ? 'bg-gray-100' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                        height={100}
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file[0]"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov,.avi"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, JPG, JPEG, PNG, MP4, MOV, AVI up to 50MB each
                      </p>
                    </div>
                  </div>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-1 bg-gray-50 rounded-md text-xs">
                          <div className="flex items-center">
                            {getFileIcon(file)}
                            <span className="ml-1 text-gray-500 truncate max-w-xs">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg className="w-3 h-3" height={40} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  d="M6 6l12 12M6 18L18 6"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTrackModal;
